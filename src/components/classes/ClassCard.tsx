import Image from "next/image";
import type { CraftClass } from "@/types";
import { formatDuration, formatPrice } from "@/lib/format";

interface ClassCardProps {
  craftClass: CraftClass;
  onApply: (classId: string) => void;
}

export function ClassCard({ craftClass, onApply }: ClassCardProps) {
  const { id, name, description, price, durationMinutes, capacity, image } = craftClass;
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <div className="relative aspect-[4/3] w-full bg-beige">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-lg font-semibold text-ink">{name}</h3>
        <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
        <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-ink-muted">가격</dt>
          <dd className="text-ink">{formatPrice(price)} (1인)</dd>
          <dt className="text-ink-muted">소요시간</dt>
          <dd className="text-ink">{formatDuration(durationMinutes)}</dd>
          <dt className="text-ink-muted">최대 인원</dt>
          <dd className="text-ink">최대 {capacity}명</dd>
        </dl>
        <button
          type="button"
          onClick={() => onApply(id)}
          className="min-h-11 w-full rounded-md bg-accent px-4 font-medium text-surface hover:bg-accent-hover"
        >
          신청하기<span className="sr-only"> - {name}</span>
        </button>
      </div>
    </article>
  );
}
