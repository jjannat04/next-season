interface FarmHeroImageProps {
  src: string;
  alt: string;
  eyebrow?: string;
  caption?: string;
}

export function FarmHeroImage({
  src,
  alt,
  eyebrow = "Field observation",
  caption,
}: FarmHeroImageProps) {
  return (
    <figure className="relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
      <div className="aspect-[16/9] overflow-hidden lg:aspect-[21/9]">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute left-5 top-5">
        <span className="rounded-full bg-[var(--color-background)]/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)] backdrop-blur-sm">
          {eyebrow}
        </span>
      </div>

      {caption && (
        <figcaption className="border-t border-[var(--color-border)] px-5 py-3 text-xs leading-5 text-[var(--color-ink-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}