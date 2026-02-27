"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { HEXAGRAMS } from "@/data/hexagrams";
import { BRAND } from "@/constants/brand";
import { buildHexagramSearchIndex, searchHexagrams, type HexagramSearchEntry } from "@/search/build_index";
import { getCardForHexagram, getHexagramContent } from "@/lib/card-index";
import { getPrimaryAxisById } from "@/lib/primary-axis-map";
import { HexagramLinesOverlay } from "@/components/HexagramLinesOverlay";

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

// 대표 행성: 8괘 중첩(팔순괘)만 노출
const FEATURED_IDS = [1, 2, 29, 30, 51, 57, 52, 58];

// 대표 8괘 전용 고정 배치 (우측 공간 비어 보임 방지)
const FEATURED_LAYOUT: Record<number, [number, number, number]> = {
  1: [4.8, 0.45, 0.1],
  2: [-4.6, -0.25, -0.2],
  29: [3.2, 2.15, -1.55],
  30: [3.35, -2.05, 1.45],
  51: [0.2, 2.75, 2.55],
  57: [-0.25, -2.65, -2.45],
  52: [-3.15, 2.05, 1.45],
  58: [-3.35, -2.05, -1.55],
};

const AXIS_COLORS: Record<AxisKey, string> = {
  money: "#5f86d9",
  work: "#4fb8a8",
  relation: "#b06ccf",
  time: "#d7a353",
};

// 설괘전 모티브 8괘 고유 색상 (중첩괘 대표 행성)
const BAGUA_PLANET_COLORS: Record<number, string> = {
  1: "#f2c14e", // 건(하늘)
  2: "#8b6f47", // 곤(땅)
  29: "#2f4f9f", // 감(물)
  30: "#d1495b", // 리(불)
  51: "#7a52c7", // 진(우레)
  57: "#2aa198", // 손(바람)
  52: "#6b7280", // 간(산)
  58: "#4da3d9", // 태(연못)
};

const AXIS_META: Record<AxisKey, { label: string; color: string }> = {
  money: { label: "돈", color: AXIS_COLORS.money },
  work: { label: "일", color: AXIS_COLORS.work },
  relation: { label: "관계", color: AXIS_COLORS.relation },
  time: { label: "시간", color: AXIS_COLORS.time },
};

const NODE_BASE_EMISSIVE = "#2a2f38";
const GOLD_RING_COLOR = "#d4b26a";
const GOLD_RING_EMISSIVE = "#e7c989";

function splitHexagramName(nameKo: string) {
  const m = nameKo.match(/^(.*)\((.*)\)$/);
  if (!m) return { full: nameKo, hanja: "" };
  return { full: m[1], hanja: m[2] };
}

function getPlanetColor(id: number, axisColor: string) {
  return BAGUA_PLANET_COLORS[id] ?? axisColor;
}

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
  const placed: [number, number, number][] = [];
  const minDistance = 1.15; // 밀도 완화 핵심

  return HEXAGRAMS.map((h) => {
    const card = getCardForHexagram(h.id);
    let chosen: [number, number, number] = [0, 0, 0];

    const fixed = FEATURED_LAYOUT[h.id];
    if (fixed) {
      chosen = fixed;
    } else {
      for (let attempt = 0; attempt < 36; attempt++) {
        const r1 = hashRand(h.id * 3.1 + attempt * 1.13);
        const r2 = hashRand(h.id * 7.7 + attempt * 1.97);
        const r3 = hashRand(h.id * 11.3 + attempt * 2.31);

        const radius = 3.4 + r1 * 5.8; // 전체 반지름 확장
        const theta = r2 * Math.PI * 2;
        const phi = Math.acos(2 * r3 - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi) * 0.78;
        const z = radius * Math.sin(phi) * Math.sin(theta);

        const ok = placed.every(([px, py, pz]) => {
          const dx = x - px;
          const dy = y - py;
          const dz = z - pz;
          return Math.sqrt(dx * dx + dy * dy + dz * dz) >= minDistance;
        });

        if (ok || attempt === 35) {
          chosen = [x, y, z];
          break;
        }
      }
    }

    placed.push(chosen);

    return {
      id: h.id,
      label: card.full_name ?? h.nameKo,
      summary: h.summary,
      keywords: h.keywords,
      position: chosen,
      size: 0.09 + hashRand(h.id * 17.2) * 0.11,
    };
  });
}

function makeWaveSplitTexture() {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  const amp = 20;
  const freq = 4;

  for (let x = 0; x < w; x++) {
    const yMid = h / 2 + Math.sin((x / w) * Math.PI * 2 * freq) * amp;

    ctx.fillStyle = "#e85b66";
    ctx.fillRect(x, 0, 1, yMid);

    ctx.fillStyle = "#4b7dff";
    ctx.fillRect(x, yMid, 1, h - yMid);
  }

  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

const BAGUA_PATTERNS = [
  [1, 1, 1],
  [0, 1, 1],
  [1, 0, 1],
  [0, 0, 1],
  [1, 1, 0],
  [0, 1, 0],
  [1, 0, 0],
  [0, 0, 0],
] as const;

function BaguaRing({ radius, isMobile }: { radius: number; isMobile: boolean }) {
  const iconScale = isMobile ? 0.72 : 1;
  return (
    <group>
      {BAGUA_PATTERNS.map((pattern, idx) => {
        const ang = (idx / 8) * Math.PI * 2;
        const x = Math.cos(ang) * radius;
        const z = Math.sin(ang) * radius;
        return (
          <group key={idx} position={[x, 0, z]} rotation={[0, -ang + Math.PI / 2, 0]}>
            {pattern.map((v, li) => {
              const y = (li - 1) * 0.07 * iconScale;
              return v === 1 ? (
                <mesh key={li} position={[0, y, 0]}>
                  <planeGeometry args={[0.16 * iconScale, 0.014 * iconScale]} />
                  <meshBasicMaterial color="#e9eef3" transparent opacity={0.5} />
                </mesh>
              ) : (
                <group key={li} position={[0, y, 0]}>
                  <mesh position={[-0.048 * iconScale, 0, 0]}>
                    <planeGeometry args={[0.055 * iconScale, 0.014 * iconScale]} />
                    <meshBasicMaterial color="#e9eef3" transparent opacity={0.5} />
                  </mesh>
                  <mesh position={[0.048 * iconScale, 0, 0]}>
                    <planeGeometry args={[0.055 * iconScale, 0.014 * iconScale]} />
                    <meshBasicMaterial color="#e9eef3" transparent opacity={0.5} />
                  </mesh>
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

function HexagramPulseSeal({ selectedId, isMobile }: { selectedId: number; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const lifeRef = useRef(0);

  useEffect(() => {
    lifeRef.current = 1;
  }, [selectedId]);

  const bits = useMemo(() => {
    const n = Math.max(0, Math.min(63, selectedId - 1));
    return Array.from({ length: 6 }, (_, i) => ((n >> i) & 1) as 0 | 1);
  }, [selectedId]);

  useFrame((_, delta) => {
    lifeRef.current = Math.max(0, lifeRef.current - delta * 0.32); // 조절: 6효 각인 지속시간
    if (matRef.current) matRef.current.opacity = 0.32 * lifeRef.current;
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05;
  });

  if (lifeRef.current <= 0.001) return null;

  const s = isMobile ? 0.82 : 1;
  return (
    <group ref={groupRef} rotation={[0.36, 0.12, 0]} position={[0, 0, 1.63]}>
      {bits.map((v, i) => {
        const y = (i - 2.5) * 0.1 * s;
        return v === 1 ? (
          <mesh key={i} position={[0, y, 0]}>
            <planeGeometry args={[0.28 * s, 0.02 * s]} />
            <meshBasicMaterial ref={i === 0 ? matRef : undefined} color="#dfe9f6" transparent opacity={0.3} />
          </mesh>
        ) : (
          <group key={i} position={[0, y, 0]}>
            <mesh position={[-0.085 * s, 0, 0]}>
              <planeGeometry args={[0.1 * s, 0.02 * s]} />
              <meshBasicMaterial ref={i === 0 ? matRef : undefined} color="#dfe9f6" transparent opacity={0.3} />
            </mesh>
            <mesh position={[0.085 * s, 0, 0]}>
              <planeGeometry args={[0.1 * s, 0.02 * s]} />
              <meshBasicMaterial color="#dfe9f6" transparent opacity={0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function CoreTaeguk({ isMobile }: { isMobile: boolean; selectedId: number }) {
  const ref = useRef<THREE.Group>(null);
  const seg = isMobile ? 56 : 84;
  const waveMap = useMemo(() => makeWaveSplitTexture(), []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.62, seg, seg]} />
        <meshStandardMaterial map={waveMap} emissive="#0c1220" emissiveIntensity={0.16} roughness={0.52} metalness={0.08} />
      </mesh>
    </group>
  );
}

function AxisOrbits() {
  return null;
}

function NodeCloud({
  nodes,
  selectedId,
  hoverId,
  isMobile,
  lowDensity,
  showSelectedLabel,
  freezeRotation,
  getPrimaryAxis,
  onHover,
  onSelect,
}: {
  nodes: Node[];
  selectedId: number;
  hoverId: number | null;
  isMobile: boolean;
  lowDensity: boolean;
  showSelectedLabel: boolean;
  freezeRotation: boolean;
  getPrimaryAxis: (id: number) => AxisKey;
  onHover: (id: number | null) => void;
  onSelect: (id: number) => void;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current || freezeRotation) return;
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={ref}>
      {nodes.map((n) => {
        const selected = n.id === selectedId;
        const hovered = n.id === hoverId;
        const axis = getPrimaryAxis(n.id);
        const axisColor = AXIS_COLORS[axis];
        const planetColor = getPlanetColor(n.id, axisColor);
        const showLabel = showSelectedLabel && selected;
        const scale = lowDensity ? 0.75 : 1;

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
              <sphereGeometry args={[(selected ? n.size * 1.8 : hovered ? n.size * 1.45 : n.size) * (isMobile ? 1.35 : 1) * scale, 18, 18]} />
              <meshStandardMaterial
                color={planetColor}
                emissive={NODE_BASE_EMISSIVE}
                emissiveIntensity={selected ? 0.38 : hovered ? 0.26 : 0.14}
                roughness={0.34}
                metalness={0.16}
                transparent
                opacity={selected ? 1 : hovered ? 0.9 : 0.52}
              />
            </mesh>

            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[(n.size * (isMobile ? 1.5 : 1.2)) + 0.06, selected ? 0.024 : 0.011, 10, 48]} />
              <meshStandardMaterial color={GOLD_RING_COLOR} emissive={GOLD_RING_EMISSIVE} emissiveIntensity={selected ? 1.35 : hovered ? 0.9 : lowDensity ? 0.4 : 0.65} transparent opacity={selected ? 1 : hovered ? 0.82 : lowDensity ? 0.28 : 0.52} />
            </mesh>

            {selected && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[(n.size * (isMobile ? 1.5 : 1.2)) + 0.11, 0.009, 10, 48]} />
                <meshStandardMaterial color={GOLD_RING_COLOR} emissive={GOLD_RING_EMISSIVE} emissiveIntensity={0.95} transparent opacity={0.78} />
              </mesh>
            )}

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


function CinematicFX({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.04;
    }
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.18 + (Math.sin(t * 1.4) + 1) * 0.08;
      ringRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.02);
    }
  });

  const count = isMobile ? 60 : 120;
  const nodes = Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    const r = 2.45 + (i % 7) * 0.045;
    const y = ((i % 9) - 4) * 0.03;
    return [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number];
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.38, 0.015, 12, isMobile ? 120 : 220]} />
        <meshBasicMaterial color="#ffd98a" transparent opacity={0.24} />
      </mesh>

      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[isMobile ? 0.012 : 0.014, 8, 8]} />
          <meshBasicMaterial color={idx % 3 === 0 ? "#ffd08a" : idx % 3 === 1 ? "#88c8ff" : "#d49bff"} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

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
  const lowDensity = false;
  const [revealCount, setRevealCount] = useState(16);

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

  // low-density mode is now always on by default

  const nodes = useMemo(() => buildNodes(), []);
  const visibleNodes = useMemo(() => {
    const featured = nodes.filter((n) => FEATURED_IDS.includes(n.id));
    if (viewMode !== "all") return featured;
    return nodes.slice(0, Math.min(revealCount, nodes.length));
  }, [nodes, viewMode, revealCount]);

  useEffect(() => {
    if (viewMode !== "all") {
      setRevealCount(16);
      return;
    }

    setRevealCount(8);
    const timer = setInterval(() => {
      setRevealCount((prev) => (prev >= 64 ? prev : prev + 8));
    }, 140);
    return () => clearInterval(timer);
  }, [viewMode]);

  const getPrimaryAxis = (id: number): AxisKey => getPrimaryAxisById(id);

  const selected = nodes.find((n) => n.id === (hoverId ?? selectedId)) ?? nodes[0];
  const selectedCard = getCardForHexagram(selected.id);
  const selectedContent = getHexagramContent(selected.id);
  const selectedHex = HEXAGRAMS.find((h) => h.id === selected.id);
  const selectedName = splitHexagramName(selectedHex?.nameKo ?? selectedCard.short_name);
  const nextHex = pickNextRecommendation(selected.id);
  const axisStrengths = HEX_AXIS_STRENGTH[selected.id] ?? { work: 2 };

  const searchIndex = useMemo(() => buildHexagramSearchIndex(), []);
  const searchResults = useMemo(() => searchHexagrams(searchIndex, searchInput, 5), [searchIndex, searchInput]);

  const freezeRotation = hoverId !== null || panelOpen;
  const cameraPreset = useMemo(() => {
    if (isMobile) {
      return viewMode === "all"
        ? { position: [0.2, 0.35, 17.4] as [number, number, number], fov: 62 }
        : { position: [0.45, 0.55, 15.9] as [number, number, number], fov: 58 };
    }

    return viewMode === "all"
      ? { position: [0.1, 0.2, 14.8] as [number, number, number], fov: 54 }
      : { position: [0.45, 0.35, 13.6] as [number, number, number], fov: 50 };
  }, [isMobile, viewMode]);

  const jumpToHexagram = (id: number) => {
    setSelectedId(id);
    setViewMode("all");
    setPanelOpen(true);
    setSearchOpen(false);
    setSearchInput("");
  };

  // save feature removed for now

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Canvas camera={cameraPreset}>
        <fog attach="fog" args={["#05060a", 8, 28]} />
        <ambientLight intensity={0.52} />
        <pointLight position={[8, 8, 8]} intensity={1.1} color="#dce8ff" />
        <pointLight position={[-9, -6, 6]} intensity={0.55} color="#59bbff" />

        <Stars radius={80} depth={42} count={isMobile ? 260 : 680} factor={isMobile ? 1.2 : 1.8} fade speed={0.18} />

        <CoreTaeguk isMobile={isMobile} selectedId={selected.id} />
        <CinematicFX isMobile={isMobile} />
        <AxisOrbits />
        <NodeCloud
          nodes={visibleNodes}
          selectedId={selectedId}
          hoverId={hoverId}
          isMobile={isMobile}
          lowDensity={lowDensity}
          showSelectedLabel={!isMobile || panelOpen}
          freezeRotation={freezeRotation}
          getPrimaryAxis={getPrimaryAxis}
          onHover={setHoverId}
          onSelect={(id) => {
            setSelectedId(id);
            if (isMobile) {
              setPanelOpen(true);
            }
          }}
        />

        <OrbitControls
          enablePan={false}
          minDistance={6.5}
          maxDistance={18}
          enableDamping
          dampingFactor={0.06}
          autoRotate={!freezeRotation}
          autoRotateSpeed={0.22}
        />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto absolute top-4 left-4 right-4 flex items-start justify-between text-[12px] tracking-wide text-white/85 md:top-6 md:left-6 md:right-6">
          <div className="max-w-[62vw] md:max-w-none">
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

            <div className="flex items-center gap-2" />
          </div>
        </div>

        {(!isMobile || !panelOpen) && (
          <div className={`pointer-events-auto absolute z-40 ${isMobile ? "right-4 top-40" : "right-6 bottom-8"}`}>
            <button
              onClick={() => {
                setPanelOpen((v) => !v);
                if (isMobile) setHoverId(null);
              }}
              className="rounded-md border border-white/30 bg-black/60 px-4 py-2 text-sm text-white shadow-lg"
            >
              {panelOpen ? "패널 닫기" : "핵심 보기"}
            </button>
          </div>
        )}

        {panelOpen && (
          <aside className={`pointer-events-auto absolute z-30 border border-white/20 bg-black/55 text-sm text-white/90 backdrop-blur-sm ${
            isMobile
              ? "left-3 right-3 bottom-3 top-auto max-h-[68vh] overflow-y-auto rounded-2xl p-4"
              : "right-6 top-20 w-[380px] rounded-2xl p-4"
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
              <div className="relative flex w-full aspect-[9/16] items-center justify-center bg-black/20">
                <div className="pointer-events-none flex justify-center">
                  <HexagramLinesOverlay lines={selectedContent.lines} size="small" styleVariant="gold" />
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-base font-semibold">
                  #{selected.id} {selectedName.full}{selectedName.hanja ? ` (${selectedName.hanja})` : ""}
                </h3>
                <Link href={`/hexagram/${selected.id}`} className="mt-2 inline-block text-xs underline text-white/85">
                  자세히 보기
                </Link>
              </div>
            </div>
          </aside>
        )}

        {showGuide && (
          <div className={`pointer-events-auto absolute rounded-xl border border-white/25 bg-black/55 px-4 py-2 text-xs text-white/90 backdrop-blur-sm ${
            isMobile ? "left-3 right-3 top-24" : "bottom-20 left-1/2 -translate-x-1/2"
          }`}>
            <div className="flex items-start justify-between gap-3">
              <p>
                처음에는 <b>대표 보기</b>로 시작하고, 익숙해지면 <b>전체 64</b>로 확장해보세요.
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
                <button
                  className="text-xs text-white/80 underline"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchInput("");
                  }}
                >
                  닫기
                </button>
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
                  <p className="text-xs text-white/60">검색 결과가 없습니다. 번호/괘이름/별칭으로 다시 시도해 주세요.</p>
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

        {!searchOpen && (
          <button
            onClick={() => setSearchOpen(true)}
            className="pointer-events-auto absolute bottom-20 right-4 z-40 rounded-full border border-white/35 bg-black/70 px-4 py-2 text-xs text-white shadow-lg backdrop-blur md:bottom-6 md:right-6"
            aria-label="괘 검색 열기"
            title="괘 검색"
          >
            🔍 괘 검색
          </button>
        )}

        {/* save feature removed for now */}

        <div className="pointer-events-none absolute bottom-4 left-4 right-4 hidden items-end justify-between text-[11px] text-white/55 md:flex md:bottom-6 md:left-6 md:right-6">
          <span>ABOUT</span>
          <span>{hoverId ? "HOVER MODE" : "ORBIT MODE"}</span>
          <span>{BRAND.mainTitle}</span>
        </div>
      </div>
    </section>
  );
}
