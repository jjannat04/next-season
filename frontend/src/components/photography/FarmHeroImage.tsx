interface FarmHeroImageProps {
  src: string;
  alt: string;
  eyebrow?: string;
  caption?: string;
  layout?: "landscape" | "editorial";
}

export function FarmHeroImage({
  src,
  alt,
  eyebrow = "Field observation",
  caption,
  layout = "landscape",
}: FarmHeroImageProps) {
  return (
    <figure className="relative overflow-hidden bg-[var(--color-surface-muted)] shadow-[var(--shadow-soft)]">
      <div
        className={
          layout === "editorial"
            ? "aspect-[4/3] overflow-hidden lg:aspect-[5/4]"
            : "aspect-[16/9] overflow-hidden lg:aspect-[21/9]"
        }
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute left-5 top-5">
        <span className="inline-flex border-l-2 border-[var(--color-amber-500)] bg-[var(--color-earth-blue)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-on-dark)]">
          {eyebrow}
        </span>
      </div>

      {caption && (
        <figcaption className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-sm text-[var(--color-ink-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
