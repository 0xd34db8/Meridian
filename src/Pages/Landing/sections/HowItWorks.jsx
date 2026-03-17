import React from "react";

export default function FigmaInspiredHowItWorks() {
  return (
    <section className="py-10 sm:py-24 md:py-20 md:pb-30 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white text-[#1E1E1E] font-sans selection:bg-[#A259FF] selection:text-white overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content: Figma-style Typography */}
        <div className="space-y-8 md:space-y-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-[-0.03em]">
            Prompt, retrieve, and <span className="text-[#A259FF]">verify</span>{" "}
            from first query to final answer
          </h2>

          <div className="space-y-6 md:space-y-8">
            {/* Semantic Search Item */}
            <div className="group flex items-start gap-4 sm:gap-5">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0ACF83] flex items-center justify-center transition-transform group-hover:rotate-12">
                <div className="w-4 h-4 bg-white rounded-full opacity-80" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold">
                  Semantic Search
                </h3>
                <p className="text-base sm:text-lg text-gray-500 leading-snug">
                  Crawls your PDFs and Pinecone index in milliseconds.
                </p>
              </div>
            </div>

            {/* Live Web Item */}
            <div className="group flex items-start gap-4 sm:gap-5">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#1ABCFE] flex items-center justify-center transition-transform group-hover:-rotate-12">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-white opacity-80" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold">Live Web</h3>
                <p className="text-base sm:text-lg text-gray-500 leading-snug">
                  Tavily API integration for real-time grounded facts.
                </p>
              </div>
            </div>

            {/* Guardrails Item */}
            <div className="group flex items-start gap-4 sm:gap-5">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#F24E1E] flex items-center justify-center transition-transform group-hover:scale-110">
                <div className="w-4 h-4 bg-white rotate-45 opacity-80" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold">Guardrails</h3>
                <p className="text-base sm:text-lg text-gray-500 leading-snug">
                  NVIDIA NeMo ensures every token is safe and grounded.
                </p>
              </div>
            </div>
          </div>

          <button className="group w-full sm:w-auto text-base sm:text-lg font-bold inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1E1E1E] text-white rounded-full hover:bg-black transition-all active:scale-95">
            View the LangGraph orchestration
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Right Content: The "Canvas" Mockup */}
        <div className="relative mt-8 lg:mt-0">
          <div className="bg-[#F5F5F5] rounded-[32px] sm:rounded-[40px] p-2 sm:p-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100">
            <div className="bg-[#1E1E1E] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 aspect-square sm:aspect-video overflow-hidden relative">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF6157]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="ml-3 text-[9px] sm:text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                  FastAPI SSE Stream
                </span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-3 sm:space-y-4 font-mono text-[11px] sm:text-sm">
                <div className="flex gap-2 text-green-400">
                  <span className="shrink-0">&gt;</span>
                  <span className="animate-pulse">
                    data: [STATUS] Scanning PDFs...
                  </span>
                </div>

                <div className="flex gap-2 text-blue-400">
                  <span className="shrink-0">&gt;</span>
                  <span>data: [STATUS] Web search complete (Tavily)</span>
                </div>

                <div className="pt-2 sm:pt-4 text-gray-300 leading-relaxed">
                  According to the ingested documents, the Llama-3.1 model
                  provides 128k context length and improved reasoning...
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#1ABCFE] text-white px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold rounded-sm shadow-lg animate-bounce flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                Live Search
              </div>
            </div>

            {/* Floating Badge (Grounded Output) */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] sm:w-[60%] bg-[#A259FF] text-white py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-between border border-white/20">
              <span className="font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                Grounded Output
              </span>
              <div className="flex -space-x-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-400 border-2 border-[#1E1E1E]" />
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-400 border-2 border-[#1E1E1E]" />
              </div>

              {/* Figma Cursor */}
              <div className="absolute -top-10 -right-4 sm:-top-4 sm:-right-2 z-20 flex items-center gap-1 scale-75 sm:scale-100">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-lg"
                >
                  <path
                    d="M5.5 3.21V20.8L10.3 16.05L13.7 22.81L16.43 21.43L13.03 14.67H20.25L5.5 3.21Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="0.5"
                  />
                </svg>
                <span className="bg-[#ff5959] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-md whitespace-nowrap">
                  Agent_01
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------------------------------------------------------------------------------

// export default function HowItWorks() {
//   return (
//     <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
//       <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
//         {/* Left Content */}
//         <div className="space-y-8">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tighter">
//             Prompt, retrieve, and verify from first query to final answer
//           </h2>

//           <div className="space-y-4">
//             <div className="flex items-start gap-4">
//               <div className="w-6 h-6 rounded bg-[#0ACF83] mt-1" />
//               <p className="text-lg sm:text-xl text-gray-700">
//                 <b>Semantic Search:</b> Crawls your PDFs and Pinecone index in
//                 milliseconds.
//               </p>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="w-6 h-6 rounded bg-[#1ABCFE] mt-1" />
//               <p className="text-lg sm:text-xl text-gray-700">
//                 <b>Live Web:</b> Tavily API integration for real-time grounded
//                 facts.
//               </p>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="w-6 h-6 rounded bg-[#A259FF] mt-1" />
//               <p className="text-lg sm:text-xl text-gray-700">
//                 <b>Guardrails:</b> NVIDIA NeMo ensures every token is safe and
//                 grounded.
//               </p>
//             </div>
//           </div>

//           <button className="flex items-center gap-2 font-bold text-[#5551FF] border-b-2 border-transparent hover:border-[#5551FF] transition-all w-fit py-1">
//             View the LangGraph orchestration →
//           </button>
//         </div>

//         {/* Chat Mockup */}
//         <div className="bg-[#1E1E1E] rounded-3xl p-4 sm:p-6 aspect-[4/3] md:aspect-video shadow-2xl overflow-hidden relative group border border-gray-800">
//           <div className="flex gap-2 mb-6">
//             <div className="w-3 h-3 rounded-full bg-[#FF6157]" />
//             <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
//             <div className="w-3 h-3 rounded-full bg-[#28C840]" />
//             <span className="ml-4 text-[10px] text-gray-500 font-mono tracking-widest uppercase">
//               FastAPI SSE Stream
//             </span>
//           </div>

//           <div className="space-y-4 font-mono text-xs sm:text-sm">
//             <div className="flex gap-2 text-green-400">
//               <span>&gt;</span>
//               <span className="animate-pulse">
//                 data: [STATUS] Scanning PDFs...
//               </span>
//             </div>

//             <div className="flex gap-2 text-blue-400">
//               <span>&gt;</span>
//               <span>data: [STATUS] Web search complete (Tavily)</span>
//             </div>

//             <div className="pt-4 text-gray-300 leading-relaxed">
//               According to the ingested documents, the Llama-3.1 model provides
//               128k context length...
//             </div>
//           </div>

//           <div className="absolute bottom-6 right-6 bg-[#1ABCFE] text-white px-3 py-1 text-xs font-bold rounded-sm shadow-lg animate-bounce flex items-center gap-2">
//             <div className="w-2 h-2 bg-white rounded-full animate-ping" />
//             Live Search Active
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
