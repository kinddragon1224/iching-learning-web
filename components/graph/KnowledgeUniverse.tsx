"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Line, Html } from "@react-three/drei";
import { HEXAGRAMS } from "@/data/hexagrams";

type Node = {
  id: number;
  label: string;
  summary: string;
  keywords: string[];
  position: [number, number, number];
  cluster: "upper" | "lower";
};

function fibonacciSpherePoint(i: number, total: number, radius: number): [number, number, number] {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = i * offset - 1 + offset / 2;
  const r = Math.sqrt(1 - y * y);
  const phi = i * increment;
  const x = Math.cos(phi) * r;
  const z = Math.sin(phi) * r;
  return [x * radius, y * radius, z * radius];
}

function buildNodes(): Node[] {
  return HEXAGRAMS.map((h, i) => ({
    id: h.id,
    label: h.nameKo,
    summary: h.summary,
    keywords: h.keywords,
    position: fibonacciSpherePoint(i, HEXAGRAMS.length, 6.5),
    cluster: h.id <= 32 ? "upper" : "lower",
  }));
}

function relatedIds(targetId: number): number[] {
  const target = HEXAGRAMS.find((h) => h.id === targetId);
  if (!target) return [];

  const prev = targetId === 1 ? 64 : targetId - 1;
  const next = targetId === 64 ? 1 : targetId + 1;
  const opposite = ((targetId + 31) % 64) + 1;

  const scored = HEXAGRAMS.filter((h) => h.id !== targetId)
    .map((h) => {
      const overlap = h.keywords.filter((k) => target.keywords.includes(k)).length;
      return { id: h.id, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
    .map((s) => s.id);

  return Array.from(new Set([prev, next, opposite, ...scored]));
}

function CoreTaeguk() {
  const groupRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial color="#d4b26a" emissive="#a07b33" emissiveIntensity={0.7} roughness={0.32} metalness={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.05, 0.04, 16, 180]} />
        <meshStandardMaterial color="#7dd3ff" emissive="#58b5ff" emissiveIntensity={0.9} transparent opacity={0.72} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0.9, 0.4]}>
        <torusGeometry args={[2.45, 0.02, 16, 180]} />
        <meshStandardMaterial color="#e8cd94" emissive="#d4b26a" emissiveIntensity={0.65} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function HexNodes({
  nodes,
  selectedId,
  hoverId,
  onHover,
  onSelect,
}: {
  nodes: Node[];
  selectedId: number;
  hoverId: number | null;
  onHover: (id: number | null) => void;
  onSelect: (id: number) => void;
}) {
  const groupRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.04;
  });

  const topLabelIds = useMemo(() => new Set([1, 2, 11, 12, 24, 29, 30, 63, 64, selectedId]), [selectedId]);

  return (
    <group ref={groupRef}>
      {nodes.map((node) => {
        const selected = node.id === selectedId;
        const hovered = node.id === hoverId;
        const showLabel = topLabelIds.has(node.id) || hovered;

        return (
          <group key={node.id} position={node.position}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                onHover(node.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                onHover(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(node.id);
              }}
            >
              <sphereGeometry args={[selected ? 0.22 : 0.14, 16, 16]} />
              <meshStandardMaterial
                color={selected ? "#f0dfb5" : node.cluster === "upper" ? "#79bcff" : "#b995ff"}
                emissive={selected ? "#e8cd94" : node.cluster === "upper" ? "#2f6cff" : "#6f41d9"}
                emissiveIntensity={selected ? 1 : hovered ? 0.75 : 0.42}
                roughness={0.25}
                metalness={0.35}
              />
            </mesh>

            {showLabel && (
              <Html center distanceFactor={18} position={[0, selected ? 0.38 : 0.31, 0]}>
                <div className="node-label">#{node.id} {node.label}</div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function KnowledgeUniverse() {
  const [selectedId, setSelectedId] = useState(1);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const nodes = useMemo(() => buildNodes(), []);
  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const selected = nodeById.get(selectedId)!;

  const links = relatedIds(selectedId)
    .map((id) => {
      const n = nodeById.get(id);
      if (!n) return null;
      return [selected.position, n.position] as [[number, number, number], [number, number, number]];
    })
    .filter(Boolean) as [[number, number, number], [number, number, number]][];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nodes;

    return nodes.filter((n) => {
      return (
        n.id.toString() === q ||
        n.label.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [nodes, query]);

  const activePreview = (hoverId ? nodeById.get(hoverId) : selected) ?? selected;

  const learnedCount = 19;
  const reviewCount = 11;

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="paper-panel rounded-2xl p-2 h-[560px] relative overflow-hidden">
        <div className="absolute left-3 top-3 z-10 rounded-xl border border-[rgba(198,163,92,0.4)] bg-[rgba(9,9,14,0.72)] px-3 py-2 text-xs text-[var(--text-muted)]">
          <p className="font-semibold text-[#f0dfb5]">우주 지도 범례</p>
          <p>상경(1~32): 파랑 / 하경(33~64): 보라</p>
          <p>밝은 노드: 선택됨 · 선: 연관성</p>
        </div>

        <Canvas camera={{ position: [0, 0, 16], fov: 55 }}>
          <fog attach="fog" args={["#050507", 12, 42]} />
          <ambientLight intensity={0.45} />
          <pointLight position={[8, 8, 8]} intensity={1.2} color="#d4b26a" />
          <pointLight position={[-10, -4, 7]} intensity={0.8} color="#5fb8ff" />
          <Stars radius={80} depth={56} count={4200} factor={3.2} fade speed={0.55} />
          <Stars radius={48} depth={20} count={1200} factor={6} saturation={0.6} fade speed={0.2} />

          <CoreTaeguk />
          <HexNodes nodes={nodes} selectedId={selectedId} hoverId={hoverId} onHover={setHoverId} onSelect={setSelectedId} />

          {links.map((line, i) => (
            <Line key={i} points={line} color="#7cd2ff" lineWidth={1.3} transparent opacity={0.75} />
          ))}

          <OrbitControls enablePan={false} minDistance={9} maxDistance={24} />
        </Canvas>
      </div>

      <aside className="paper-panel rounded-2xl p-5 space-y-4">
        <div>
          <p className="text-xs text-[var(--text-muted)]">학습 데이터 상태</p>
          <h3 className="text-xl font-semibold mt-1">{activePreview.id}. {activePreview.label}</h3>
          <p className="text-sm text-[var(--text-muted)] mt-2 line-clamp-3">{activePreview.summary}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">오늘 학습시간</span><b>27분</b></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">완료 괘</span><b>{learnedCount} / 64</b></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">복습 대기</span><b>{reviewCount}개</b></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">연속 학습</span><b>5일</b></div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">64괘 검색/인덱스</p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="번호, 괘명, 키워드 검색"
            className="w-full rounded-lg border border-[rgba(212,178,106,0.35)] bg-[rgba(8,8,12,0.65)] px-3 py-2 text-sm outline-none focus:border-[rgba(212,178,106,0.8)]"
          />
          <div className="max-h-40 overflow-auto space-y-1 pr-1">
            {filtered.slice(0, 24).map((n) => (
              <button
                key={n.id}
                onMouseEnter={() => setHoverId(n.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => setSelectedId(n.id)}
                className={`w-full rounded-md border px-2 py-1 text-left text-xs ${
                  selectedId === n.id
                    ? "border-[rgba(212,178,106,0.75)] bg-[rgba(212,178,106,0.16)]"
                    : "border-[rgba(212,178,106,0.25)]"
                }`}
              >
                #{n.id} {n.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">연관 노드</p>
          <div className="flex flex-wrap gap-2">
            {relatedIds(selectedId).map((id) => (
              <button key={id} onClick={() => setSelectedId(id)} className="gold-chip rounded-full px-3 py-1 text-xs">
                #{id}
              </button>
            ))}
          </div>
          <Link href={`/hexagrams/${selectedId}`} className="inline-block text-xs underline text-[#e8cd94]">
            선택 괘 상세 학습으로 이동
          </Link>
        </div>
      </aside>
    </section>
  );
}
