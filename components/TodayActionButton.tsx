"use client";

import { useState } from "react";

export function TodayActionButton({ id, text }: { id: number; text: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      onClick={() => {
        localStorage.setItem(`hexagram-action-${id}`, JSON.stringify({ id, text, savedAt: Date.now() }));
        setSaved(true);
      }}
      className="rounded-lg border border-black/15 bg-black px-3 py-2 text-sm text-white"
    >
      {saved ? "저장 완료" : "오늘 실행 저장"}
    </button>
  );
}
