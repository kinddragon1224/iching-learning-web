"use client";

import dynamic from "next/dynamic";

const KnowledgeUniverse = dynamic(
  () => import("@/components/graph/KnowledgeUniverse").then((m) => m.KnowledgeUniverse),
  { ssr: false }
);

export default function ExplorePage() {
  return <KnowledgeUniverse />;
}
