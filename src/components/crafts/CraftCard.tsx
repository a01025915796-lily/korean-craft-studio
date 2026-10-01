import Image from "next/image";
import { formatPrice } from "@/lib/format";
import type { Craft } from "@/types";

interface CraftCardProps {
  craft: Craft;
  onOrder: (craftId: string) => void;
}

export function CraftCard({ craft, onOrder }: CraftCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <div className="relative aspect-[4/3] w-full bg-beige">
        <Image
          src={craft.image.src}
          alt={craft.image.alt}
          width={800}
          height={600}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="w-fit rounded-full bg-beige px-3 py-1 text-xs font-medium text-ink-muted">
          {craft.category}
        </span>
        <h3 className="font-serif text-lg font-semibold text-ink">{craft.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ink-muted">{craft.description}</p>
        <p className="text-lg font-semibold text-ink">{formatPrice(craft.price)}</p>
        <button
          type="button"
          onClick={() => onOrder(craft.id)}
          className="min-h-11 w-full rounded-md bg-accent px-4 font-medium text-surface hover:bg-accent-hover"
        >
          주문 문의하기
          <span className="sr-only"> ({craft.name})</span>
        </button>
      </div>
    </article>
  );
}
