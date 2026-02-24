"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { HEXAGRAMS } from "@/data/hexagrams";
import { BRAND } from "@/constants/brand";
import { buildHexagramSearchIndex, searchHexagrams, type HexagramSearchEntry } from "@/search/build_index";
import { getCardForHexagram, toPublicAsset } from "@/lib/card-index";
import { getPrimaryAxisById } from "@/lib/primary-axis-map";

type ViewMode = "featured" | "all";
type AxisKey = "money" | "work" | "relation" | "time";
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
  money: { label: "돈", color: "#7c8fbc" },
  work: { label: "일", color: "#6f9d95" },
  relation: { label: "관계", color: "#a183a7" },
  time: { label: "시간", color: "#a99574" },
};

const HEX_AXIS_STRENGTH: Record<number, Partial<Record<AxisKey, AxisStrength>>> = {
  1: { work: 3, time: 2, money: 1 },
  2: { relation: 3, work: 2, time: 1 },
  11: { relation: 3, money: 2, work: 1 },
  12: { relation: 3, time: 2, money: 1 },
  14: { money: 3, work: 2, relation: 1 },
  15: { relation: 2, time: 3, work: 1 },
  16: { work: 2, relation: 3, time: 1 },
  24: { time: 3, work: 2, relation: 1 },
  29: { money: 3, time: 3, work: 1 },
  30: { work: 3, time: 2, relation: 1 },
  31: { relation: 3, work: 2, time: 1 },
  32: { time: 3, relation: 2, work: 1 },
  63: { time: 3, work: 2, money: 1 },
  64: { money: 2, time: 3, relation: 1 },
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

function makeSubtleNoiseTexture() {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#f2f4f6";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < size * 10; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const a = 0.025 + Math.random() * 0.03;
    ctx.fillStyle = `rgba(20,24,30,${a})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  return t;
}

function CoreTaeguk({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const ribbonARef = useRef<THREE.Mesh>(null);
  const ribbonBRef = useRef<THREE.Mesh>(null);
  const noiseTex = useMemo(() => makeSubtleNoiseTexture(), []);

  const seg = isMobile ? 56 : 88;

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    ref.current.rotation.y += delta * 0.06;
    ref.current.rotation.z = Math.sin(t * 0.12) * 0.03;

    if (haloRef.current) {
      const m = haloRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.42 + Math.sin(t * 0.7) * 0.08; // 조절: 헤일로 밝기 호흡
    }

    if (ribbonARef.current) {
      ribbonARef.current.rotation.y += delta * 0.09; // 조절: 리본 속도
      ribbonARef.current.rotation.x = Math.sin(t * 0.21) * 0.16;
    }
    if (ribbonBRef.current) {
      ribbonBRef.current.rotation.y -= delta * 0.09; // 조절: 리본 속도
      ribbonBRef.current.rotation.x = Math.sin(t * 0.21 + Math.PI) * 0.16;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.58, seg, seg]} />
        <meshStandardMaterial
          color="#eef1f3"
          map={noiseTex}
          roughness={0.86}
          metalness={0.03}
          emissive="#d7e1ea"
          emissiveIntensity={0.06}
        />
      </mesh>

      <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.95, 0.015, 12, isMobile ? 96 : 160]} />
        <meshStandardMaterial
          color="#cfe7ff"
          emissive="#a8d6ff"
          emissiveIntensity={0.42}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh ref={ribbonARef} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[2.18, 0.022, 10, isMobile ? 96 : 180]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#e9f5ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.48}
        />
      </mesh>

      <mesh ref={ribbonBRef} rotation={[Math.PI / 2.1, Math.PI, 0]}>
        <torusGeometry args={[2.18, 0.022, 10, isMobile ? 96 : 180]} />
        <meshStandardMaterial
          color="#111418"
          emissive="#5f7085"
          emissiveIntensity={0.28}
          transparent
          opacity={0.44}
        />
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
  isMobile,
  showSelectedLabel,
  getPrimaryAxis,
  onHover,
  onSelect,
}: {
  nodes: Node[];
  selectedId: number;
  hoverId: number | null;
  isMobile: boolean;
  showSelectedLabel: boolean;
  getPrimaryAxis: (id: number) => AxisKey;
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
        const axis = getPrimaryAxis(n.id);
        const axisColor = AXIS_META[axis].color;
        const showLabel = showSelectedLabel && selected;

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
                color={selected ? "#ffffff" : axisColor}
                emissive={axisColor}
                emissiveIntensity={selected ? 0.58 : hovered ? 0.44 : 0.26}
                roughness={0.28}
                metalness={0.2}
              />
            </mesh>

            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[(n.size * (isMobile ? 1.5 : 1.2)) + 0.06, selected ? 0.02 : 0.01, 10, 48]} />
              <meshStandardMaterial color={axisColor} emissive={axisColor} emissiveIntensity={selected ? 0.8 : 0.35} transparent opacity={selected ? 0.9 : 0.45} />
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
    relation: "협업이 막히는 지점을 ‘지원 요청’으로 바꿔 전달했는가?",
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
    relation: "협업을 어렵게 만든 오해를 풀기 위한 확인 질문을 했는가?",
    time: "이번 주 회복/집중 시간 블록을 캘린더에 실제로 넣었는가?",
  };

  const lowPriorityFallbackByAxis: Record<AxisKey, string> = {
    money: "이번 주 지출 구조에서 멈춰도 되는 항목 1개를 골랐는가?",
    work: "성과와 무관한 작업을 오늘 1개 줄일 수 있는가?",
    relation: "대화 비용을 줄이기 위해 전달 문장을 더 단순화했는가?",
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
  const [showGuide, setShowGuide] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const apply = () => {
      const mobile = mql.matches;
      setIsMobile(mobile);
      setPanelOpen(mobile ? false : true);
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

  const getPrimaryAxis = (id: number): AxisKey => getPrimaryAxisById(id);

  const selected = nodes.find((n) => n.id === (hoverId ?? selectedId)) ?? nodes[0];
  const selectedCard = getCardForHexagram(selected.id);
  const nextHex = pickNextRecommendation(selected.id);
  const axisStrengths = HEX_AXIS_STRENGTH[selected.id] ?? { work: 2 };
  const axisQuestions = build4AxisQuestions(selected.id, axisStrengths);

  const searchIndex = useMemo(() => buildHexagramSearchIndex(), []);
  const searchResults = useMemo(() => searchHexagrams(searchIndex, searchInput, 5), [searchIndex, searchInput]);

  const jumpToHexagram = (id: number) => {
    setSelectedId(id);
    setViewMode("all");
    setPanelOpen(true);
    setSearchOpen(false);
    setSearchInput("");
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, isMobile ? 14.5 : 13], fov: isMobile ? 56 : 50 }}>
        <fog attach="fog" args={["#05060a", 8, 28]} />
        <ambientLight intensity={0.52} />
        <pointLight position={[8, 8, 8]} intensity={1.1} color="#dce8ff" />
        <pointLight position={[-9, -6, 6]} intensity={0.55} color="#59bbff" />

        <Stars radius={80} depth={42} count={isMobile ? 260 : 680} factor={isMobile ? 1.2 : 1.8} fade speed={0.18} />

        <CoreTaeguk isMobile={isMobile} />
        <AxisOrbits strengths={axisStrengths} />
        <NodeCloud
          nodes={visibleNodes}
          selectedId={selectedId}
          hoverId={hoverId}
          isMobile={isMobile}
          showSelectedLabel={!isMobile || panelOpen}
          getPrimaryAxis={getPrimaryAxis}
          onHover={setHoverId}
          onSelect={(id) => {
            setSelectedId(id);
            if (isMobile) {
              setPanelOpen(true);
            }
          }}
        />

        <OrbitControls enablePan={false} minDistance={6.5} maxDistance={18} />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto absolute top-4 left-4 right-4 flex items-start justify-between text-[12px] tracking-wide text-white/85 md:top-6 md:left-6 md:right-6">
          <div className="max-w-[58vw] md:max-w-none">
            <p className="text-lg font-bold leading-tight break-keep md:text-2xl">{BRAND.mainTitle}</p>
            <p className="mt-1 text-[11px] text-white/70 break-keep md:text-sm">{BRAND.subTitle}</p>
            <p className="mt-0.5 text-[10px] text-white/50 break-words md:text-xs">{BRAND.tagline}</p>
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
              onClick={() => setSearchOpen(true)}
              className="rounded border border-white/30 bg-black/45 px-3 py-2 text-xs text-white md:py-1.5"
              aria-label="괘 검색"
              title="괘 검색"
            >
              🔍 검색
            </button>
          </div>
        </div>

        {(!isMobile || !panelOpen) && (
          <div className={`pointer-events-auto absolute z-40 ${isMobile ? "right-4 bottom-16" : "right-6 top-24"}`}>
            <button
              onClick={() => {
                setPanelOpen((v) => !v);
                if (isMobile) setHoverId(null);
              }}
              className="rounded-md border border-white/30 bg-black/45 px-4 py-2 text-sm text-white"
            >
              {panelOpen ? "닫기" : "4축 보기"}
            </button>
          </div>
        )}

        {panelOpen && (
          <aside className={`pointer-events-auto absolute z-30 border border-white/20 bg-black/55 text-sm text-white/90 backdrop-blur-sm ${
            isMobile
              ? "left-3 right-3 bottom-3 top-auto max-h-[68vh] overflow-y-auto rounded-2xl p-4"
              : "right-6 top-36 w-[380px] rounded-2xl p-4"
          }`}>
            {isMobile && (
              <div className="mb-2 flex justify-end">
                <button
                  onClick={() => {
                    setPanelOpen(false);
                    setHoverId(null);
                  }}
                  className="rounded border border-white/30 bg-white/10 px-2 py-1 text-xs"
                >
                  닫기
                </button>
              </div>
            )}
            <p className="text-xs text-white/60">카드 미리보기</p>
            <div className="mt-2 overflow-hidden rounded-xl border border-white/15 bg-black/35">
              <Image
                src={toPublicAsset(selectedCard.card_image)}
                alt={`#${selected.id} 카드 이미지`}
                width={640}
                height={360}
                className="h-36 w-full object-cover"
              />
              <div className="p-3">
                <h3 className="text-base font-semibold">
                  {selectedCard.full_name
                    ? `#${selected.id} ${selectedCard.full_name} (${selectedCard.short_name})`
                    : `#${selected.id} ${selectedCard.short_name}`}
                </h3>
                <span className="mt-1 inline-block rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[11px]">
                  {AXIS_META[getPrimaryAxis(selected.id)].label}
                </span>
                <p className="mt-1 text-xs text-white/75">{selectedCard.one_liner}</p>
                <div className="mt-2 flex gap-2">
                  <Link href={`/hexagram/${selected.id}`} className="rounded border border-white/30 bg-white/10 px-2 py-1 text-xs">
                    상세 보기
                  </Link>
                  <button
                    onClick={() => {
                      setPanelOpen(false);
                      setHoverId(null);
                    }}
                    className="rounded border border-white/30 bg-white/10 px-2 py-1 text-xs"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>

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
                <li><b>[관계]</b> {axisQuestions.relation}</li>
                <li><b>[시간]</b> {axisQuestions.time}</li>
              </ul>
            </div>

            <Link href={`/hexagram/${selected.id}`} className="mt-4 inline-block text-xs underline text-white/85">
              상세 학습으로 이동
            </Link>
          </aside>
        )}

        {showGuide && (
          <div className={`pointer-events-auto absolute rounded-xl border border-white/25 bg-black/55 px-4 py-2 text-xs text-white/90 backdrop-blur-sm ${
            isMobile ? "left-3 right-3 top-24" : "bottom-20 left-1/2 -translate-x-1/2"
          }`}>
            <div className="flex items-start justify-between gap-3">
              <p>
                처음엔 <b>대표 보기</b>, 익숙해지면 <b>전체 64</b>로 전환해 탐색해봐.
              </p>
              <button
                onClick={() => setShowGuide(false)}
                className="shrink-0 rounded border border-white/25 bg-white/10 px-2 py-0.5 text-[10px] text-white/80"
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {searchOpen && (
          <div className="pointer-events-auto absolute inset-0 z-50 bg-black/50">
            <div
              className={`absolute border border-white/25 bg-black/85 backdrop-blur-md ${
                isMobile
                  ? "left-0 right-0 bottom-0 rounded-t-2xl p-4"
                  : "left-1/2 top-20 w-[440px] -translate-x-1/2 rounded-2xl p-4"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">괘 검색</p>
                <button className="text-xs text-white/80 underline" onClick={() => setSearchOpen(false)}>닫기</button>
              </div>
              <input
                autoFocus
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="번호, 괘 이름으로 검색 (예: 25, 무망)"
                className="w-full rounded-lg border border-white/25 bg-black/50 px-3 py-2 text-sm text-white outline-none"
              />
              <div className="mt-3 space-y-2">
                {searchResults.length === 0 && (
                  <p className="text-xs text-white/60">검색 결과가 없어. 번호/괘이름/별칭으로 다시 시도해줘.</p>
                )}
                {searchResults.map((r: HexagramSearchEntry) => {
                  const axis = getPrimaryAxis(r.id);
                  return (
                    <button
                      key={r.id}
                      onClick={() => jumpToHexagram(r.id)}
                      className="block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-left text-sm text-white/90"
                    >
                      {(r.fullNameKo ? `#${r.id} ${r.fullNameKo} (${r.nameKo})` : `#${r.id} ${r.nameKo}`) + ` · ${AXIS_META[axis].label}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute bottom-4 left-4 right-4 hidden items-end justify-between text-[11px] text-white/55 md:flex md:bottom-6 md:left-6 md:right-6">
          <span>ABOUT</span>
          <span>{hoverId ? "HOVER MODE" : "ORBIT MODE"}</span>
          <span>{BRAND.mainTitle}</span>
        </div>
      </div>
    </section>
  );
}
