import { redirect } from "next/navigation";
import { HEXAGRAMS } from "@/data/hexagrams";

export function generateStaticParams() {
  return HEXAGRAMS.map((h) => ({ id: String(h.id) }));
}

export default async function LegacyHexagramDetailRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/hexagram/${id}`);
}
