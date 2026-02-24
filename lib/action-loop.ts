export type Axis = "money" | "work" | "relation" | "time";
export type AnswerState = "done" | "defer";

export type ActionRecord = {
  id: string;
  date: string;
  hexagram_id: number;
  hexagram_title: string;
  axis: Axis | null;
  question_axis: Axis;
  question_text: string;
  answer_state: AnswerState;
  note: string;
  created_at: string;
};

export const ACTIONS_KEY = "gwaedo_actions_v1";
export const WEEKLY_REPORTS_KEY = "gwaedo_weekly_reports_v1";

export const AXIS_LABEL: Record<Axis, string> = {
  money: "돈",
  work: "일",
  relation: "관계",
  time: "시간",
};

export function todayKST() {
  const d = new Date();
  const k = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  return k.toISOString().slice(0, 10);
}

export function loadActions(): ActionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACTIONS_KEY);
    return raw ? (JSON.parse(raw) as ActionRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveActions(records: ActionRecord[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIONS_KEY, JSON.stringify(records));
}

export function upsertAction(
  payload: Omit<ActionRecord, "id" | "created_at">,
  options?: { replace?: boolean }
): { saved: ActionRecord; replaced: boolean } {
  const records = loadActions();
  const idx = records.findIndex(
    (r) => r.date === payload.date && r.hexagram_id === payload.hexagram_id && r.question_axis === payload.question_axis
  );

  const next: ActionRecord = {
    ...payload,
    id: `${payload.date}-${payload.hexagram_id}-${payload.question_axis}`,
    created_at: new Date().toISOString(),
  };

  if (idx >= 0) {
    if (options?.replace === false) return { saved: records[idx], replaced: false };
    records[idx] = { ...records[idx], ...next };
    saveActions(records);
    return { saved: records[idx], replaced: true };
  }

  records.unshift(next);
  saveActions(records);
  return { saved: next, replaced: false };
}

export function getRecent7Days(records: ActionRecord[]) {
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - 6);
  return records.filter((r) => {
    const d = new Date(r.date + "T00:00:00");
    return d >= new Date(start.toDateString()) && d <= new Date(end.toDateString());
  });
}

export function buildWeeklyReport(records: ActionRecord[]) {
  const recent = getRecent7Days(records);
  const done = recent.filter((r) => r.answer_state === "done").length;
  const defer = recent.filter((r) => r.answer_state === "defer").length;

  const axisCount: Record<Axis, number> = { money: 0, work: 0, relation: 0, time: 0 };
  recent.forEach((r) => axisCount[r.question_axis]++);

  const sortedAxis = (Object.keys(axisCount) as Axis[]).sort((a, b) => axisCount[b] - axisCount[a]);
  const primary = sortedAxis[0] ?? "work";
  const total = Math.max(1, recent.length);
  const primaryPct = Math.round((axisCount[primary] / total) * 100);

  const hexMap = new Map<number, { title: string; count: number }>();
  recent.forEach((r) => {
    const now = hexMap.get(r.hexagram_id) ?? { title: r.hexagram_title, count: 0 };
    now.count += 1;
    hexMap.set(r.hexagram_id, now);
  });
  const top3 = [...hexMap.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 3);

  const strategy =
    defer > done
      ? `다음 주엔 ${AXIS_LABEL[primary]} 축에서 '내일로' 1개를 '했다'로 전환해.`
      : `다음 주엔 ${AXIS_LABEL[primary]} 축 루틴을 유지/강화해.`;

  const firstDate = recent[recent.length - 1]?.date ?? todayKST();
  const lastDate = recent[0]?.date ?? todayKST();

  const text = [
    `괘도 주간 리포트 (${firstDate}~${lastDate})`,
    `1) 이번 주 저장: ${recent.length}개, 완료(done) ${done}개 / 내일로(defer) ${defer}개`,
    `2) 가장 많이 다룬 축: ${AXIS_LABEL[primary]} — ${primaryPct}%`,
    `3) 가장 많이 본 괘 TOP3: ${
      top3.map(([id, v]) => `${v.title} (${v.count}회)`).join(", ") || "기록 없음"
    }`,
    `다음 주 한 줄 전략: ${strategy}`,
    `오늘의 한 문장: ${recent[0]?.question_text ?? "기록을 시작해봐."}`,
  ].join("\n");

  return { recent, done, defer, axisCount, primary, primaryPct, top3, strategy, text };
}
