"use client";

import { useEffect, useState } from "react";
import { loadActions, todayKST, upsertAction, type Axis } from "@/lib/action-loop";

export function QuestionActionButtons({
  hexagramId,
  hexagramTitle,
  axis,
  question,
}: {
  hexagramId: number;
  hexagramTitle: string;
  axis: Axis;
  question: string;
}) {
  const [toast, setToast] = useState("");
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    const t = todayKST();
    setTodayCount(loadActions().filter((r) => r.date === t).length);
  }, [toast]);

  const save = (answer: "done" | "defer") => {
    upsertAction(
      {
        date: todayKST(),
        hexagram_id: hexagramId,
        hexagram_title: hexagramTitle,
        axis,
        question_axis: axis,
        question_text: question,
        answer_state: answer,
        note: "",
      },
      { replace: true }
    );
    const next = loadActions().filter((r) => r.date === todayKST()).length;
    setToast(`저장됨. 오늘 ${next}/4`);
    setTimeout(() => setToast(""), 1200);
  };

  return (
    <div className="mt-1">
      <div className="flex gap-2">
        <button className="rounded border px-2 py-1 text-xs" onClick={() => save("done")}>했다</button>
        <button className="rounded border px-2 py-1 text-xs" onClick={() => save("defer")}>내일로</button>
      </div>
      {toast && <p className="mt-1 text-[11px] text-emerald-700">{toast}</p>}
    </div>
  );
}
