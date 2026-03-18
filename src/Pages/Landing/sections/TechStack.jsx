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
          <div className="h-48 flex items-center justify-center bg-white rounded-4xl">
            <img
              src="https://avatars.githubusercontent.com/u/54333248?s=200&v=4"
              alt="user"
            />
          </div>
        </Card>

        <Card
          title="Neon PostgreSQL"
          description="Persistent conversation memory via LangGraph AsyncPostgresSaver on serverless infrastructure."
          linkText="View database"
          bgColor="bg-[#EFF7FF]"
        >
          <div className="h-48 flex items-center justify-center bg-white">
            <img src={"/NDB.png"} alt="user" />
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
