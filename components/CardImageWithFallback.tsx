"use client";

import Image from "next/image";
import { useState } from "react";
import { toPublicAsset } from "@/lib/card-index";

export function CardImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const [current, setCurrent] = useState(src);
  return (
    <Image
      src={toPublicAsset(current)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setCurrent("/cards/placeholder.png")}
    />
  );
}
