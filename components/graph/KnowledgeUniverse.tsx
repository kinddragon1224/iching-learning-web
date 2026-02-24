"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { HEXAGRAMS } from "@/data/hexagrams";

type LabelMode = "auto" | "always" | "none";
type ViewMode = "featured" | "all";
type AxisKey = "money" | "work" | "relationship" | "time";
type AxisStrength = 1 | 2 | 3;

type Node = {
  id: number;
  label: string;
  summary: string;
  keywords: string[];
  position: [number, number, number];
  size: number;
};

const FEATURED_IDS = [1, 2, 11, 12, 29, 30, 63, 64, 24, 14, 15, 16, 31, 32];

const AXIS_META: Record<AxisKey, { label: string; color: string }> = {
  money: { label: "돈", color: "#84a5ff" },
  work: { label: "일", color: "#6ce6d8" },
  relationship: { label: "관계", color: "#f29fd5" },
  time: { label: "시간", color: "#f7d08a" },
};

const HEX_AXIS_STRENGTH: Record<number, Partial<Record<AxisKey, AxisStrength>>> = {
  1: { work: 3, time: 2, money: 1 },
  2: { relationship: 3, work: 2, time: 1 },
  11: { relationship: 3, money: 2, work: 1 },
  12: { relationship: 3, time: 2, money: 1 },
  14: { money: 3, work: 2, relationship: 1 },
  15: { relationship: 2, time: 3, work: 1 },
  16: { work: 2, relationship: 3, time: 1 },
  24: { time: 3, work: 2, relationship: 1 },
  29: { money: 3, time: 3, work: 1 },
  30: { work: 3, time: 2, relationship: 1 },
  31: { relationship: 3, work: 2, time: 1 },
  32: { time: 3, relationship: 2, work: 1 },
  63: { time: 3, work: 2, money: 1 },
  64: { money: 2, time: 3, relationship: 1 },
};

function hashRand(seed: number) {
  const x = Math.sin(seed * 999.91) * 43758.5453;
  return x - Math.floor(x);
}

function buildNodes(): Node[] {
  return HEXAGRAMS.map((h) => {
    const r1 = hashRand(h.id * 3.1);
    const r2 = hashRand(h.id * 7.7);
    const r3 = hashRand(h.id * 11.3);

    const radius = 2.4 + r1 * 4.2;
    const theta = r2 * Math.PI * 2;
    const phi = Math.acos(2 * r3 - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi) * 0.85;
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return {
      id: h.id,
      label: h.nameKo,
      summary: h.summary,
      keywords: h.keywords,
      position: [x, y, z],
      size: 0.09 + hashRand(h.id * 17.2) * 0.11,
    };
  });
}

function makeTaegukTexture() {
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#0f1014";
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy + r / 2, r / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#0f1014";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy - r / 2, r / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy + r / 2, r / 8, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy - r / 2, r / 8, 0, Math.PI * 2);
  ctx.fillStyle = "#0f1014";
  ctx.fill();

  return new THREE.CanvasTexture(c);
}

function CoreTaeguk() {
  const ref = useRef<THREE.Group>(null);
  const tex = useMemo(() => makeTaegukTexture(), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.55, 96, 96]} />
        <meshStandardMaterial map={tex} emissive="#ffffff" emissiveIntensity={0.16} roughness={0.5} metalness={0.05} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[2.2, 0.03, 16, 180]} />
        <meshStandardMaterial color="#98dcff" emissive="#67c9ff" emissiveIntensity={0.65} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function AxisOrbits({ strengths }: { strengths: Partial<Record<AxisKey, AxisStrength>> }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const maxStrength = Math.max(...Object.values(strengths), 1);
    ref.current.rotation.y -= delta * (0.02 + maxStrength * 0.012);
  });

  return (
    <group ref={ref}>
      {(Object.keys(AXIS_META) as AxisKey[]).map((axis, idx) => {
        const strength = strengths[axis] ?? 0;
        const tube = strength === 3 ? 0.03 : strength === 2 ? 0.022 : strength === 1 ? 0.017 : 0.012;
        const opacity = strength === 3 ? 0.92 : strength === 2 ? 0.72 : strength === 1 ? 0.5 : 0.25;
        const emissiveIntensity = strength === 3 ? 0.9 : strength === 2 ? 0.65 : strength === 1 ? 0.4 : 0.18;

        return (
          <group key={axis} rotation={[idx * 0.7, idx * 0.4, idx * 0.25]}>
            <mesh>
              <torusGeometry args={[3.1 + idx * 0.2, tube, 16, 180]} />
              <meshStandardMaterial
                color={AXIS_META[axis].color}
                emissive={AXIS_META[axis].color}
                emissiveIntensity={emissiveIntensity}
                transparent
                opacity={opacity}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function NodeCloud({
  nodes,
  selectedId,
  hoverId,
  labelMode,
  isMobile,
  onHover,
  onSelect,
}: {
  nodes: Node[];
  selectedId: number;
  hoverId: number | null;
  labelMode: LabelMode;
  isMobile: boolean;
  onHover: (id: number | null) => void;
  onSelect: (id: number) => void;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={ref}>
      {nodes.map((n) => {
        const selected = n.id === selectedId;
        const hovered = n.id === hoverId;
        const showLabel = selected || labelMode === "always" || (labelMode === "auto" && hovered);

        return (
          <group key={n.id} position={n.position}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelect(n.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHover(n.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                onHover(null);
              }}
            >
              <sphereGeometry args={[(selected ? n.size * 1.8 : hovered ? n.size * 1.45 : n.size) * (isMobile ? 1.35 : 1), 18, 18]} />
              <meshStandardMaterial
                color={selected ? "#ffffff" : "#79b9ff"}
                emissive={selected ? "#ffffff" : "#2b65d9"}
                emissiveIntensity={selected ? 0.95 : hovered ? 0.6 : 0.34}
                roughness={0.22}
                metalness={0.36}
              />
            </mesh>

            {showLabel && (
              <Html center distanceFactor={14} position={[0, n.size * 2.2, 0]}>
                <div className="node-label">#{n.id} {n.label}</div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function pickNextRecommendation(currentId: number) {
  const curr = HEXAGRAMS.find((h) => h.id === currentId);
  if (!curr) return HEXAGRAMS[0];

  let best = HEXAGRAMS[0];
  let bestScore = -1;
  for (const h of HEXAGRAMS) {
    if (h.id === currentId) continue;
    const overlap = h.keywords.filter((k) => curr.keywords.includes(k)).length;
    if (overlap > bestScore) {
      best = h;
      bestScore = overlap;
    }
  }
  return best;
}

const HEX_AXIS_COPY: Record<number, Partial<Record<AxisKey, string>>> = {
  1: {
    work: "이번 주 최우선 실행 1개를 팀이 같은 문장으로 말할 수 있는가?",
    time: "성급함 대신 점검 시간을 의도적으로 확보했는가?",
  },
  2: {
    relationship: "협업이 막히는 지점을 ‘지원 요청’으로 바꿔 전달했는가?",
    work: "반복 업무 1개를 운영 규칙으로 고정했는가?",
  },
  29: {
    money: "최악 시나리오 기준으로 현금 버퍼를 점검했는가?",
    time: "위기 상황에서 쓸 복구 루틴을 일정에 박아뒀는가?",
  },
  30: {
    work: "지금 판단 기준이 지표 2개로 선명하게 정리되어 있는가?",
    time: "정보 소비보다 정리 시간을 먼저 배치했는가?",
  },
  63: {
    time: "완료 이후 유지보수 체크를 오늘 할 일로 내렸는가?",
    work: "성과 이후 품질 저하를 막는 점검 1개를 실행했는가?",
  },
  64: {
    money: "검증 전 확장을 멈추고 위험 가설을 점검했는가?",
    time: "마무리 직전 조급함을 줄이는 완충 시간을 넣었는가?",
  },
};

function build4AxisQuestions(hexId: number, strengths: Partial<Record<AxisKey, AxisStrength>>) {
  const custom = HEX_AXIS_COPY[hexId] ?? {};

  const fallbackByAxis: Record<AxisKey, string> = {
    money: "현금흐름을 불안하게 만드는 작은 누수 1개를 찾았나?",
    work: "지금 해야 할 핵심 행동 1개가 문장으로 명확한가?",
    relationship: "협업을 어렵게 만든 오해를 풀기 위한 확인 질문을 했는가?",
    time: "이번 주 회복/집중 시간 블록을 캘린더에 실제로 넣었는가?",
  };

  const lowPriorityFallbackByAxis: Record<AxisKey, string> = {
    money: "이번 주 지출 구조에서 멈춰도 되는 항목 1개를 골랐는가?",
    work: "성과와 무관한 작업을 오늘 1개 줄일 수 있는가?",
    relationship: "대화 비용을 줄이기 위해 전달 문장을 더 단순화했는가?",
    time: "우선순위 밖 일정 1개를 뒤로 미룰 수 있는가?",
  };

  const result = {} as Record<AxisKey, string>;
  (Object.keys(AXIS_META) as AxisKey[]).forEach((axis) => {
    const strength = strengths[axis] ?? 0;
    result[axis] = custom[axis] ?? (strength >= 2 ? fallbackByAxis[axis] : lowPriorityFallbackByAxis[axis]);
  });

  return result;
}

export function KnowledgeUniverse() {
  const [selectedId, setSelectedId] = useState(1);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("featured");
  const [labelMode, setLabelMode] = useState<LabelMode>("auto");
  const [showGuide, setShowGuide] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const apply = () => {
      const mobile = mql.matches;
      setIsMobile(mobile);
      setPanelOpen(mobile ? false : true);
      setLabelMode(mobile ? "none" : "auto");
    };
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  const nodes = useMemo(() => buildNodes(), []);
  const visibleNodes = useMemo(
    () => (viewMode === "all" ? nodes : nodes.filter((n) => FEATURED_IDS.includes(n.id))),
    [nodes, viewMode]
  );

  const selected = nodes.find((n) => n.id === (hoverId ?? selectedId)) ?? nodes[0];
  const nextHex = pickNextRecommendation(selected.id);
  const axisStrengths = HEX_AXIS_STRENGTH[selected.id] ?? { work: 2, time: 2 };
  const axisQuestions = build4AxisQuestions(selected.id, axisStrengths);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, isMobile ? 14.5 : 13], fov: isMobile ? 56 : 50 }}>
        <fog attach="fog" args={["#05060a", 8, 28]} />
        <ambientLight intensity={0.52} />
        <pointLight position={[8, 8, 8]} intensity={1.1} color="#dce8ff" />
        <pointLight position={[-9, -6, 6]} intensity={0.55} color="#59bbff" />

        <Stars radius={80} depth={42} count={isMobile ? 260 : 680} factor={isMobile ? 1.2 : 1.8} fade speed={0.18} />

        <CoreTaeguk />
        <AxisOrbits strengths={axisStrengths} />
        <NodeCloud
          nodes={visibleNodes}
          selectedId={selectedId}
          hoverId={hoverId}
          labelMode={labelMode}
          isMobile={isMobile}
          onHover={setHoverId}
          onSelect={(id) => {
            setSelectedId(id);
            if (isMobile) {
              setPanelOpen(true);
            }
          }}
        />

        <OrbitControls enablePan={false} minDistance={8} maxDistance={18} />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto absolute top-4 left-4 right-4 flex items-start justify-between text-[12px] tracking-wide text-white/85 md:top-6 md:left-6 md:right-6">
          <div>
            <p className="text-lg font-semibold leading-none md:text-xl">세개의 행성</p>
            <p className="mt-1 text-[10px] text-white/55 md:mt-2 md:text-[11px]">I CHING UNIVERSE · 4축 해석</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-[12px]">
            <div className="flex rounded-lg border border-white/30 bg-black/45 p-1">
              <button
                onClick={() => setViewMode("featured")}
                className={`rounded px-3 py-2 text-sm md:px-3 md:py-1.5 ${
                  viewMode === "featured" ? "bg-white/20 text-white" : "text-white/75"
                }`}
              >
                대표
              </button>
              <button
                onClick={() => setViewMode("all")}
                className={`rounded px-3 py-2 text-sm md:px-3 md:py-1.5 ${
                  viewMode === "all" ? "bg-white/20 text-white" : "text-white/75"
                }`}
              >
                64
              </button>
            </div>

            <button
              onClick={() =>
                setLabelMode((m) => (m === "auto" ? "always" : m === "always" ? "none" : "auto"))
              }
              className="rounded border border-white/30 bg-black/45 px-3 py-2 text-xs text-white md:py-1.5"
            >
              라벨: {labelMode}
            </button>
          </div>
        </div>

        <div className={`pointer-events-auto absolute ${isMobile ? "right-4 bottom-16" : "right-6 top-24"}`}>
          <button
            onClick={() => setPanelOpen((v) => !v)}
            className="rounded-md border border-white/30 bg-black/45 px-4 py-2 text-sm text-white"
          >
            {panelOpen ? "닫기" : "4축 보기"}
          </button>
        </div>

        {panelOpen && (
          <aside className={`pointer-events-auto absolute border border-white/20 bg-black/55 text-sm text-white/90 backdrop-blur-sm ${
            isMobile
              ? "left-3 right-3 bottom-3 top-auto max-h-[68vh] overflow-y-auto rounded-2xl p-4"
              : "right-6 top-36 w-[380px] rounded-2xl p-4"
          }`}>
            <p className="text-xs text-white/60">선택 노드</p>
            <h3 className="mt-1 text-xl font-semibold">#{selected.id} {selected.label}</h3>
            <p className="mt-2 text-sm text-white/70 line-clamp-3">{selected.summary}</p>

            {isMobile && (
              <p className="mt-2 text-[11px] text-white/60">패널 내부를 위아래로 스크롤해서 전체 해석을 볼 수 있어.</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              {(Object.keys(AXIS_META) as AxisKey[]).map((axis) => (
                <span
                  key={axis}
                  className={`rounded-full border px-2 py-0.5 ${
                    (axisStrengths[axis] ?? 0) >= 2 ? "border-white/60 bg-white/15" : "border-white/20 bg-white/5 text-white/60"
                  }`}
                >
                  {AXIS_META[axis].label} {(axisStrengths[axis] ?? 0) > 0 ? `·${axisStrengths[axis]}` : ""}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-1 text-xs text-white/70">
              <div className="flex justify-between"><span>현재 괘</span><b>#{selected.id}</b></div>
              <div className="flex justify-between"><span>진도</span><b>{viewMode === "featured" ? "대표 모드" : "전체 모드"}</b></div>
              <div className="flex justify-between"><span>오늘 학습시간</span><b>27분</b></div>
              <div className="flex justify-between"><span>다음 추천</span><b>#{nextHex.id} {nextHex.nameKo}</b></div>
            </div>

            <div className="mt-4 rounded-lg border border-white/15 bg-black/25 p-3">
              <p className="text-xs text-white/60">4축 질문</p>
              <ul className="mt-2 space-y-2 text-xs text-white/85">
                <li><b>[돈]</b> {axisQuestions.money}</li>
                <li><b>[일]</b> {axisQuestions.work}</li>
                <li><b>[관계]</b> {axisQuestions.relationship}</li>
                <li><b>[시간]</b> {axisQuestions.time}</li>
              </ul>
            </div>

            <Link href={`/hexagrams/${selected.id}`} className="mt-4 inline-block text-xs underline text-white/85">
              상세 학습으로 이동
            </Link>
          </aside>
        )}

        {showGuide && (
          <div className={`pointer-events-auto absolute rounded-xl border border-white/25 bg-black/55 px-4 py-2 text-xs text-white/90 backdrop-blur-sm ${
            isMobile ? "left-3 right-3 top-20" : "bottom-20 left-1/2 -translate-x-1/2"
          }`}>
            처음엔 <b>대표 보기</b>, 익숙해지면 <b>전체 64</b>로 전환해 탐색해봐.
            <button onClick={() => setShowGuide(false)} className="ml-3 text-white/70 underline">닫기</button>
          </div>
        )}

        <div className="pointer-events-none absolute bottom-4 left-4 right-4 hidden items-end justify-between text-[11px] text-white/55 md:flex md:bottom-6 md:left-6 md:right-6">
          <span>ABOUT</span>
          <span>{hoverId ? "HOVER MODE" : "ORBIT MODE"}</span>
          <span>THREE PLANETS</span>
        </div>
      </div>
    </section>
  );
}
