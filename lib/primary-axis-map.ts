import AXIS_MAP_RAW from "@/data/axis_map.json";

export type PrimaryAxis = "money" | "work" | "relation" | "time";

export const PRIMARY_AXIS_MAP: Record<number, PrimaryAxis> = Object.fromEntries(
  Object.entries(AXIS_MAP_RAW).map(([k, v]) => [Number(k), v as PrimaryAxis])
) as Record<number, PrimaryAxis>;

function emergencyAxisByQuartile(id: number): PrimaryAxis {
  if (id >= 1 && id <= 16) return "money";
  if (id >= 17 && id <= 32) return "work";
  if (id >= 33 && id <= 48) return "relation";
  return "time";
}

export function getPrimaryAxisById(id: number): PrimaryAxis {
  return PRIMARY_AXIS_MAP[id] ?? emergencyAxisByQuartile(id);
}
