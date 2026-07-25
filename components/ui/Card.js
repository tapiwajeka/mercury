export default function Card({
  as: Tag = "div",
  className = "",
  children,
  ...props
}) {
  const classes = [
    "group relative block w-full h-full bg-mercurySurface border border-white/[0.06] rounded-2xl p-8",
    "transition-all duration-300",
    "hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercuryAccent focus-visible:ring-offset-2 focus-visible:ring-offset-mercuryDark",
    className,
  ].join(" ");

  return (
    <Tag className={classes} {...props}>
      {/* metallic silver top-edge highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mercurySilver/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* silver sheen on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 55% at 50% 0%, rgba(199,201,206,0.12), transparent 60%)",
        }}
      />
      {children}
    </Tag>
  );
}
