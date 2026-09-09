# Meridian Frontend

Welcome to the frontend repository for **Meridian**!

## What is Meridian?

Meridian is a powerful, production-grade Agentic AI and RAG (Retrieval-Augmented Generation) based chatbot. Built for scale, it provides streaming responses, hybrid search, and robust safety guardrails. It seamlessly combines internal knowledge base retrieval with real-time web search capabilities to deliver accurate, context-aware, and safe responses.

## What can it do?

- **RAG-Powered Chat**: Chat intelligently with ingested documents and knowledge bases.
- **Agentic Web Search**: Automatically falls back to real-time web search (via Tavily) when internal knowledge is insufficient or for current events.
- **Production-Grade Safety**: Integrated with NeMo Guardrails to block unsafe, off-topic, or hallucinatory responses.
- **Streaming Responses**: Real-time token streaming for a fast, responsive user experience.
- **Dynamic Ingestion**: Easily ingest new URLs and documents directly into the vector database (Pinecone).
- **Persistent Memory**: Maintains chat histories and thread states using PostgreSQL (NeonDB).

## What can YOU do with it?

**ABSOLUTE, UNCOMPROMISING CONTROL**

Meridian isn't some locked-down black box. **YOU own the brain.** 
- **God-Mode Parameters**: Tweak the Temperature, Max Tokens, Top P, Top K, and Repetition Penalty on the fly. You dictate exactly how the AI thinks and generates.
- **Shape-Shifting Personas**: Inject any system prompt you want. Meridian becomes whoever or whatever you need it to be in an instant.
- **Kill-Switches for Agents**: Don't want web search? Kill it. Don't need RAG? Turn it off. You toggle the agentic capabilities dynamically, on a per-request basis.

**LIMITLESS POSSIBILITIES**
- **Chat with Your Data**: Upload your own documents (PDFs, TXT, DOCX) or provide URLs to let Meridian answer questions based on your specific data.
- **Custom Agentic Workflows**: Extend the LangGraph agent in the backend to add more tools or customized workflows.
- **Build AI Applications**: Use Meridian as a boilerplate or foundational architecture for your own scalable, safe, and intelligent AI applications.
- **Deploy and Scale**: Designed with a decoupled FastAPI backend and React frontend, making it easy to deploy to cloud providers and scale as needed.

## Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

### Backend (Reference)
- **API Framework**: FastAPI
- **AI/Agent Orchestration**: LangChain & LangGraph
- **LLM**: Meta-Llama-3.1-8B-Instruct (via HuggingFace)
- **Vector Database**: Pinecone
- **Relational Database**: NeonDB (PostgreSQL) for LangGraph Checkpointing & Memory
- **Guardrails**: NeMo Guardrails
- **Search**: Tavily Search API

## Getting Started

To run the frontend locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`. Make sure the FastAPI backend is also running for full functionality.
