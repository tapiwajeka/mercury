export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignClasses =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`flex flex-col ${alignClasses} mb-16 ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.2em] text-mercurySilver uppercase mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-mercuryWhite tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-mercuryGray text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
