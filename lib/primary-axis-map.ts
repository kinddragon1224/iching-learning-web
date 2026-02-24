export type PrimaryAxis = "money" | "work" | "relation" | "time";

// 임시 매핑 테이블: 점진적으로 1~64 전체를 채워넣으면 된다.
export const PRIMARY_AXIS_MAP: Partial<Record<number, PrimaryAxis>> = {
  1: "work",
  2: "relation",
  11: "relation",
  12: "relation",
  14: "money",
  15: "time",
  16: "relation",
  24: "time",
  25: "relation",
  29: "money",
  30: "work",
  31: "relation",
  32: "time",
  63: "time",
  64: "time",
};

export function getPrimaryAxisById(id: number): PrimaryAxis {
  return PRIMARY_AXIS_MAP[id] ?? "work";
}
