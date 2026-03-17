import { HeroSticker } from "../../../components/ui/HeroSticker";
import TextType from "../../../components/ui/TextType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../components/ui/Logo";

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleStartChat = () => {
    if (!query.trim()) {
      navigate("/chat"); // Just go to chat if empty
    } else {
      // Encode the URI to handle spaces and special characters
      navigate(`/chat?prefill=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto p-8 lg:py-0 lg:px-8 text-center">
      <section className="relative lg:min-h-screen flex items-center justify-center overflow-hidden bg-white px-4">
        {/* Stickers hidden on small screens */}
        <HeroSticker
          src="/NeonDB.png"
          className="hidden lg:block top-24 left-10 w-64 h-80 border-[#0ACF83]"
          rotate={-5}
        />
        <HeroSticker
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*SKytctg3-E5DtKtFkqCQIg.png"
          className="hidden lg:block bottom-20 left-20 w-72 h-48 border-[#1ABCFE]"
          rotate={3}
        />
        <HeroSticker
          src="https://ih1.redbubble.net/image.5611428487.0532/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.webp"
          className="hidden lg:block top-40 right-10 w-64 h-96 border-[#A259FF]"
          rotate={5}
        />
        <HeroSticker
          src="https://imgs.search.brave.com/fvIgU4mhVbm0RbN0dJ4cH04MCa51h84G7Ly84-rvuqE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL2Zhc3Rh/cGk2MjMwLmxvZ293/aWsuY29tLndlYnA"
          className="hidden lg:block bottom-32 right-32 w-80 h-56 border-[#F24E1E] bg-white"
          rotate={-2}
        />

        {/* Main Hero Box */}
        <div className="text-center relative z-10 w-full max-w-xl sm:max-w-2xl mx-auto bg-white md:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 md:border-gray-100 group">
          {/* Header Section */}
          <div className="space-y-1 sm:space-y-2 text-center">
            <div className="justify-center flex space-y-1 sm:space-y-2 text-center">
              {/* <div className="flex">
                <h1
                  className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text leading-[1.2] sm:leading-[1.1]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ef4444 0%, #f97316 20%, #eab308 40%, #22c55e 60%, #3b82f6 80%, #a855f7 100%)", // changed gradient for smoother hue progression
                  }}
                >
                  Meridian
                </h1>
              </div> */}

              <div className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3">
                <h1
                  className="flex items-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text leading-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ef4444 0%, #f97316 20%, #eab308 40%, #22c55e 60%, #3b82f6 80%, #a855f7 100%)", // changed gradient for smoother hue progression
                  }}
                >
                  <Logo className="h-[0.85em] w-auto mr-[0.05em]" />
                  <span>eridian</span>
                </h1>

                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-none">
                  is
                </span>
              </div>

              {/* <h1 className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text leading-[1.2] sm:leading-[1.1] px-1 md:pl-3">
                is
              </h1> */}
            </div>

            <div className="text-center flex items-center justify-center  gap-2 flex-wrap min-h-[3rem] sm:min-h-fit">
              <TextType
                text={[
                  "A RAG-based chatbot",
                  "An Agentic AI",
                  "powered by NeonDB",
                  "built for scale",
                ]}
                as="span"
                className="lg:text-center text-2xl sm:text-4xl md:text-5xl lg:text-1xl font-bold tracking-tight text-gray-900"
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2500}
                showCursor={true}
                cursorCharacter={
                  <div className="h-7 sm:h-10 md:h-12 lg:h-14 w-[3px] bg-[#5551FF] rounded-full inline-block align-middle ml-1 sm:ml-2" />
                }
                cursorBlinkDuration={0.5}
              />
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-lg mx-auto sm:mx-0 text-center sm:text-left">
            Streaming responses, hybrid search, and production-grade safety
            guardrails.
          </p>

          {/* CTA Row - Reorganized for Mobile Flow */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-6 sm:gap-6">
            {/* Avatar Group - Centered on mobile */}
            <div className="flex items-center gap-3 sm:gap-0">
              <div className="flex -space-x-2">
                {/* Avatar 1 */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/732/732230.png"
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Avatar 2 */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6033/6033716.png"
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Avatar 3 */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5968/5968350.png"
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Add more avatars by duplicating the block above */}

                {/* +More bubble */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-black flex items-center justify-center text-[10px] font-bold text-white">
                  +More
                </div>
              </div>
            </div>

            {/* Primary Button - Full width on mobile for better thumb reach */}
            <div className="relative w-full max-w-3xl mx-auto group">
              {/* The soft AI glow you had, refined for a modern input bar */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 rounded-[26px] blur-xl opacity-40 group-focus-within:opacity-100 transition duration-500 -z-10" />

              <div className="relative flex items-center gap-2 bg-white border border-gray-200 rounded-[26px] p-2 shadow-sm hover:border-gray-300 focus-within:border-violet-400 focus-within:ring-1 focus-within:ring-violet-400 transition-all">
                {/* Simulated Input Area */}
                <div className="flex-1 flex items-center px-4">
                  <input
                    type="text"
                    placeholder="Start chatting..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
                    className="w-full bg-transparent outline-none text-gray-700 text-base sm:text-lg"
                  />

                  {/* <span className="text-gray-400 text-base sm:text-lg font-normal">
                    Start chatting...
                  </span> */}
                </div>

                {/* The Send Button with YOUR SVG */}
                <button
                  onClick={handleStartChat}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5551FF] text-white shadow-sm transition-all hover:bg-[#fc0000] active:scale-95"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6 rotate-45 text-white fill-white"
                  >
                    <path d="M2 12L21 3L12 21L10 13L2 12Z" />
                    <path
                      d="M10 13L21 3"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
