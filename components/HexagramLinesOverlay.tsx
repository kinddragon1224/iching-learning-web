type Props = {
  lines: number[];
  size?: "small" | "medium";
  styleVariant?: "gold" | "mono";
};

export function HexagramLinesOverlay({ lines, size = "small", styleVariant = "gold" }: Props) {
  const safe = Array.isArray(lines) && lines.length === 6 ? lines : [0, 0, 0, 0, 0, 0];
  const stroke = size === "medium" ? 5 : 3.6;
  const gap = size === "medium" ? 16 : 12;
  const width = size === "medium" ? 180 : 132;
  const height = size === "medium" ? 130 : 94;
  const color = styleVariant === "gold" ? "#f0cf88" : "#d8dde4";

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden>
      {safe.map((v, idx) => {
        const y = height - 12 - idx * ((height - 24) / 5); // 아래->위
        if (v === 1) {
          return <line key={idx} x1={18} y1={y} x2={width - 18} y2={y} stroke={color} strokeWidth={stroke} strokeLinecap="round" />;
        }
        return (
          <g key={idx}>
            <line x1={18} y1={y} x2={width / 2 - gap / 2} y2={y} stroke={color} strokeWidth={stroke} strokeLinecap="round" />
            <line x1={width / 2 + gap / 2} y1={y} x2={width - 18} y2={y} stroke={color} strokeWidth={stroke} strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}
