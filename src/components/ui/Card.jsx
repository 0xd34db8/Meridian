export default function Card({
  title,
  description,
  linkText,
  bgColor = "bg-transparent",
  children,
}) {
  return (
    <div
      className={`flex flex-col h-full ${bgColor} border border-gray-200 rounded-lg overflow-hidden group transition-all duration-300 hover:border-gray-300`}
    >
      {/* Content Section */}
      <div className="p-5 pb-4">
        <h3 className="text-[15px] font-medium tracking-tight text-gray-900 mb-1.5">
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed text-gray-500 mb-4">
          {description}
        </p>

        {linkText && (
          <a
            href="#home"
            className="inline-flex items-center text-[12px] font-medium text-gray-400 group-hover:text-black transition-colors"
          >
            {linkText} <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
        )}
      </div>

      {/* Visual Section */}
      <div className="px-5 pb-5 mt-auto">
        <div className="relative overflow-hidden transition-all duration-500 border border-gray-100">
          {children ? (
            children
          ) : (
            <div className="h-32 bg-gray-50 flex items-center justify-center text-gray-400 text-xs">
              Visual Placeholder
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
