import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import TechStack from "./sections/TechStack";

export default function LandingPage() {
  return (
    <div
      id="home"
      className="min-h-screen bg-white text-black selection:bg-[#A259FF] selection:text-white font-sans antialiased"
    >
      <Hero />

      <HowItWorks />

      <TechStack />

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
