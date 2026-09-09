import Card from "../../../components/ui/Card";

export default function Hero() {
  return (
    <section id="tech" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Pinecone Vector DB"
          description="High-performance semantic retrieval using collection1 index for instant context injection."
          linkText="Explore indices"
        >
          <div className="h-32 flex items-center justify-center bg-transparent">
            <img
              src="https://avatars.githubusercontent.com/u/54333248?s=200&v=4"
              alt="Pinecone"
              className="object-contain h-24 p-2"
            />
          </div>
        </Card>

        <Card
          title="Neon PostgreSQL"
          description="Persistent conversation memory via LangGraph AsyncPostgresSaver on serverless infrastructure."
          linkText="View database"
        >
          <div className="h-32 flex items-center justify-center bg-transparent overflow-hidden">
            <img src={"/NDB.png"} alt="Neon" className="object-cover w-full h-full" />
          </div>
        </Card>

        <Card
          title="Inference API"
          description="Running Llama-3.1-8B-Instruct. Production-ready inference with no local GPU overhead."
          linkText="Check latency"
        >
          <div className="h-32 flex items-center justify-center bg-transparent overflow-hidden">
            <img src={"/download.png"} alt="Inference API" className="object-cover w-full h-full" />
          </div>
        </Card>
      </div>
    </section>
  );
}
