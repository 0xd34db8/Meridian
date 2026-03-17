import Card from "../../../components/ui/Card";

export default function Hero() {
  return (
    <section id="tech" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Pinecone Vector DB"
          description="High-performance semantic retrieval using collection1 index for instant context injection."
          linkText="Explore indices"
          bgColor="bg-[#F2F7EF]"
        >
          <div className="h-48 flex items-center justify-center bg-white">
            <svg
              className="w-12 h-12 text-[#10b981]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
        </Card>

        <Card
          title="Neon PostgreSQL"
          description="Persistent conversation memory via LangGraph AsyncPostgresSaver on serverless infrastructure."
          linkText="View database"
          bgColor="bg-[#EFF7FF]"
        >
          <div className="h-48 flex items-center justify-center bg-white">
            <svg
              className="w-12 h-12 text-[#3b82f6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4"
              />
            </svg>
          </div>
        </Card>

        <Card
          title="Inference API"
          description="Running Llama-3.1-8B-Instruct. Production-ready inference with no local GPU overhead."
          linkText="Check latency"
          bgColor="bg-[#FFF9EF]"
        >
          <div className="h-48 flex items-center justify-center bg-white text-5xl object-cover">
            <img src={"/download.png"} alt="user" />
          </div>
        </Card>
      </div>
    </section>
  );
}
