"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import { HEXAGRAMS } from "@/data/hexagrams";

type Node = {
  id: number;
  label: string;
  keywords: string[];
  position: [number, number, number];
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
    keywords: h.keywords,
    position: fibonacciSpherePoint(i, HEXAGRAMS.length, 6.5),
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
  return (
    <mesh>
      <sphereGeometry args={[1.2, 48, 48]} />
      <meshStandardMaterial color="#d4b26a" emissive="#a07b33" emissiveIntensity={0.5} roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

function HexNodes({
  nodes,
  selectedId,
  onSelect,
}: {
  nodes: Node[];
  selectedId: number;
  onSelect: (id: number) => void;
}) {
  return (
    <>
      {nodes.map((node) => {
        const selected = node.id === selectedId;
        return (
          <mesh
            key={node.id}
            position={node.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(node.id);
            }}
          >
            <sphereGeometry args={[selected ? 0.2 : 0.14, 16, 16]} />
            <meshStandardMaterial
              color={selected ? "#f0dfb5" : "#6aa8ff"}
              emissive={selected ? "#e8cd94" : "#2f6cff"}
              emissiveIntensity={selected ? 0.8 : 0.35}
            />
          </mesh>
        );
      })}
    </>
  );
}

export function KnowledgeUniverse() {
  const [selectedId, setSelectedId] = useState(1);
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

  const learnedCount = 19;
  const reviewCount = 11;

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="paper-panel rounded-2xl p-2 h-[540px]">
        <Canvas camera={{ position: [0, 0, 16], fov: 55 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[8, 8, 8]} intensity={1.2} color="#d4b26a" />
          <Stars radius={70} depth={40} count={3000} factor={3} fade speed={0.5} />

          <CoreTaeguk />
          <HexNodes nodes={nodes} selectedId={selectedId} onSelect={setSelectedId} />

          {links.map((line, i) => (
            <Line key={i} points={line} color="#7cd2ff" lineWidth={1.3} transparent opacity={0.75} />
          ))}

          <OrbitControls enablePan={false} minDistance={9} maxDistance={24} />
        </Canvas>
      </div>

      <aside className="paper-panel rounded-2xl p-5 space-y-4">
        <div>
          <p className="text-xs text-[var(--text-muted)]">학습 데이터 상태</p>
          <h3 className="text-xl font-semibold mt-1">{selected.id}. {selected.label}</h3>
          <p className="text-sm text-[var(--text-muted)] mt-2">선택 노드 기준 연관 괘 네트워크를 표시합니다.</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">오늘 학습시간</span><b>27분</b></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">완료 괘</span><b>{learnedCount} / 64</b></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">복습 대기</span><b>{reviewCount}개</b></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">연속 학습</span><b>5일</b></div>
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
        </div>

        <div className="rounded-xl border border-[rgba(212,178,106,0.35)] p-3 text-xs text-[var(--text-muted)]">
          태극 코어를 중심으로 64괘 노드가 배치됩니다. 클릭한 괘는 구조/의미 유사 기준으로 연결선이 하이라이트됩니다.
        </div>
      </aside>
    </section>
  );
}
