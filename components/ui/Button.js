import Link from "next/link";

const VARIANT_CLASSES = {
  primary:
    "bg-gradient-to-r from-mercurySilver via-mercuryWhite to-mercurySilver bg-[length:200%_100%] text-mercuryBlack hover:bg-[position:100%_0] shadow-[0_8px_24px_-8px_rgba(199,201,206,0.5)]",
  secondary:
    "bg-mercurySurface text-mercuryWhite border border-white/10 hover:border-white/20 hover:bg-white/[0.08]",
  ghost:
    "bg-transparent text-mercuryWhite border border-white/15 hover:bg-white/5",
};

const SIZE_CLASSES = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide",
    "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent focus-visible:ring-offset-2 focus-visible:ring-offset-mercuryBlack",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
