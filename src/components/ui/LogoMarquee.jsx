export default function LogoMarquee() {
  const logos = [
    "Python",
    "FastAPI",
    "LangChain",
    "Llama",
    "NeonDB",
    "LangGraph",
    "PostgreSQL",
    "Pinecone",
  ];

  const marqueeLogos = [...logos, ...logos]; // duplicate for smooth infinite scroll

  return (
    <div className="w-full overflow-hidden border-b border-gray-100 py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="flex w-max items-center gap-10 sm:gap-14 md:gap-16 lg:gap-20 animate-infinite-scroll">
        {marqueeLogos.map((logo, index) => (
          <span
            key={index}
            className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-400 grayscale hover:grayscale-0 transition-all cursor-default  tracking-tight whitespace-nowrap"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
