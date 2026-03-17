export default function Card({
  title,
  description,
  linkText,
  bgColor = "bg-[#f2f7ef]", // Figma's signature soft green/grey
  children,
}) {
  return (
    <div
      className={`flex flex-col h-full ${bgColor} rounded-[32px] overflow-hidden group transition-all duration-300`}
    >
      {/* Content Section */}
      <div className="pt-10 px-10 pb-6">
        <h3 className="text-[28px] leading-[1.1] font-semibold tracking-tight text-[#1e1e1e] mb-4">
          {title}
        </h3>
        <p className="text-[17px] leading-relaxed text-[#555555] mb-6 max-w-[440px]">
          {description}
        </p>

        {linkText && (
          <a
            href="#home"
            className="inline-block text-[17px] font-medium border-b border-black pb-0.5 hover:opacity-50 transition-opacity"
          >
            {linkText}
          </a>
        )}
      </div>

      {/* Visual Section - This is where the Figma UI screenshots go */}
      <div className="mt-auto px-10 pb-10">
        <div className="relative rounded-xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
          {children ? (
            children
          ) : (
            <div className="h-64 bg-slate-50 flex items-center justify-center italic text-slate-400">
              Visual Placeholder
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
