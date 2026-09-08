import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Logo from "../components/ui/Logo";
import SendBtn from "../components/ui/SendBtn";

export default function ChatInterface() {
  const [conversations, setConversations] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState("thread_03");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [temperature, setTemperature] = useState(0.1);
  const [searchParams, setSearchParams] = useSearchParams();
  const hasPrefilled = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null); // <-- added for cancelling stream

  const cancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // <-- stops fetch stream
      abortControllerRef.current = null;
    }
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "Meridian",
        type: "Abort",
        content: "Generation cancelled by user", // <-- moved here
      },
    ]);
    setIsLoading(false); // <-- stop UI loading state
  };

  // Configuration - Ensure these match your actual backend state
  const userId = "user_02";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${baseUrl}/threads`);
      const data = await res.json();
      if (data.threads) {
        setConversations(data.threads);
      }
    } catch (e) {
      console.error("Failed to fetch threads:", e);
    }
  };

  const deleteThread = async (e, id) => {
    e.stopPropagation();
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      await fetch(`${baseUrl}/threads/${id}`, { method: "DELETE" });
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeThreadId === id) {
        setMessages([]);
        setActiveThreadId(`thread_${Date.now()}`); // generate new thread
      }
    } catch (e) {
      console.error("Failed to delete thread:", e);
    }
  };

  const handleThreadClick = async (id) => {
    setActiveThreadId(id);
    setIsLoading(true);
    setMessages([]);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${baseUrl}/chat/${id}/history`);
      const data = await res.json();
      if (data.history) {
        setMessages(data.history);
      }
    } catch (e) {
      console.error("Failed to fetch history:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setActiveThreadId(`thread_${Date.now()}`);
    setMessages([]);
  };

  const handleRenameChat = async (e, id, currentTitle) => {
    e.stopPropagation();
    const newTitle = window.prompt("Enter new chat title:", currentTitle || "");
    if (!newTitle || newTitle === currentTitle) return;

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      await fetch(`${baseUrl}/threads/${id}/title`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
      );
    } catch (err) {
      console.error("Failed to rename thread:", err);
    }
  };

  const processMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userMsgText = text;
    const userMessage = {
      id: Date.now(),
      sender: "User",
      type: "text",
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const url = new URL(`${baseUrl}/chat`);
      url.searchParams.append("user_id", userId);
      url.searchParams.append("thread_id", activeThreadId);
      url.searchParams.append("message", userMsgText);
      url.searchParams.append("temperature", temperature.toString());

      const response = await fetch(url, {
        method: "POST",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Backend connection failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedAiContent = "";
      let buffer = ""; // <-- added for proper SSE parsing

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true }); // <-- accumulate stream
        const lines = buffer.split("\n");

        buffer = lines.pop(); // <-- keep incomplete line for next chunk

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6).trim(); // <-- faster than replace()

          if (data === "[DONE]") {
            abortControllerRef.current = null; // <-- reset controller
            setIsLoading(false);
          } else if (data.startsWith("[STATUS]")) {
            const statusContent = data.replace("[STATUS] ", "");

            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + Math.random(),
                sender: "Meridian",
                type: "status",
                content: statusContent,
              },
            ]);
          } else if (data.startsWith("[ERROR]")) {
            abortControllerRef.current = null;
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + Math.random(),
                sender: "Meridian",
                type: "Error",
                content: "Error: " + data,
              },
            ]);

            setIsLoading(false);
          } else {
            let chunkText = data;
            try {
              chunkText = JSON.parse(data);
            } catch (e) {
              // Keep raw data if it's not JSON
            }
            accumulatedAiContent += chunkText;

            setMessages((prev) => {
              const lastMsg = prev[prev.length - 1];

              if (
                lastMsg &&
                lastMsg.sender === "Meridian" &&
                lastMsg.type === "text"
              ) {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMsg, content: accumulatedAiContent },
                ];
              }

              return [
                ...prev,
                {
                  id: Date.now() + "-ai",
                  sender: "Meridian",
                  type: "text",
                  content: accumulatedAiContent,
                },
              ];
            });
          }
        }
      }
    } catch (err) {
      // console.error("Stream error:", err);
      if (err.name === "AbortError") {
        console.log("Generation cancelled"); // <-- added
      } else {
        console.error("Stream error:", err);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const prefill = searchParams.get("prefill");
    if (prefill && !hasPrefilled.current) {
      hasPrefilled.current = true;
      processMessage(prefill);
      setSearchParams({}, { replace: true });
    }
  }, []);

  const handleSendMessage = () => {
    processMessage(inputValue);
    !isLoading && setInputValue("");
  };

  return (
    <div className="h-[calc(100vh-48px)] md:h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-[#F5F5F5] text-[#111] font-sans selection:bg-[#A259FF] selection:text-white">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="flex-1 overflow-y-auto p-2">
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Chats
              </h3>
              <button 
                onClick={handleNewChat} 
                className="text-gray-400 hover:text-[#A259FF] transition-colors" 
                title="New Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleThreadClick(chat.id)}
                className={`group flex items-center justify-between gap-2 px-3 py-1.5 rounded-md cursor-pointer text-sm ${chat.id === activeThreadId ? "text-[#A259FF] bg-[#F3E8FF] font-medium" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${chat.id === activeThreadId ? "bg-[#A259FF]" : "bg-gray-300"}`} />
                  <span className="truncate">{chat.title}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button 
                    onClick={(e) => handleRenameChat(e, chat.id, chat.title)}
                    className="text-gray-400 hover:text-[#A259FF]"
                    title="Rename Chat"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  <button 
                    onClick={(e) => deleteThread(e, chat.id)}
                    className="text-gray-400 hover:text-red-500"
                    title="Delete Chat"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Chat Canvas */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#F5F5F5] relative">
          <div className="flex-1 min-h-0 overflow-y-auto pt-28 md:pt-40 px-4 md:px-6 flex justify-center">
            <div className="w-full max-w-3xl space-y-6 pb-32">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "User" ? "justify-end" : "justify-start"} group`}
                >
                  <div className="relative flex items-start gap-3 max-w-[90%] md:max-w-[85%]">
                    {message.sender === "Meridian" && (
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <Logo />
                        </div>
                      </div>
                    )}

                    <div
                      className={`p-4 rounded-2xl shadow-sm border ${
                        message.sender === "User"
                          ? "bg-white border-gray-200 rounded-tr-none"
                          : message.type === "status"
                            ? "bg-gradient-to-r from-indigo-700 via-55% to-cyan-500 purple-950 text-fuchsia-50 font-mono text-xs"
                            : message.type === "Error"
                              ? "bg-gradient-to-r from-red-500 via-55% to-pink-600 text-white font-mono text-xs"
                              : message.type === "Abort" // <-- ADD THIS CHECK
                                ? "bg-orange-100 border-orange-200 text-orange-800 italic"
                                : "bg-white border-gray-100 rounded-tl-none"
                      }`}
                    >
                      {message.type === "status" ? (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          {message.content}
                        </div>
                      ) : message.type === "Error" ? (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-indigo-50 rounded-full" />
                          {message.content}
                        </div>
                      ) : message.type === "Abort" ? (
                        <div className="flex items-center gap-2">
                          <span className="bg-yellow-700" />
                          {message.content}
                        </div>
                      ) : (
                        <p className="text-[15px] leading-relaxed font-medium break-words whitespace-pre-wrap">
                          {message.content}
                        </p>
                      )}
                    </div>

                    {message.sender === "User" && (
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#1ABCFE] flex items-center justify-center border-2 border-white">
                          <span className="text-[10px] text-white font-bold">
                            YOU
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Sticky Input Bar */}

          <div className="w-full bg-transparent px-4 py-6 md:py-4 flex flex-col items-center shrink-0 pt-9">
            <div className="w-full max-w-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#A259FF] to-[#cf280a] rounded-[24px] blur-md group-focus-within:opacity-40 transition duration-500" />

              <div className="relative bg-white border-2 border-gray-200 rounded-[20px] p-2 flex items-center shadow-2xl focus-within:border-black transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLoading) handleSendMessage(); // <-- fixed
                  }}
                  placeholder={
                    isLoading ? "Meridian is thinking..." : "Ask anything..."
                  }
                  // disabled={isLoading}
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-transparent outline-none text-base md:text-lg font-medium min-w-0"
                />
                <button
                  onClick={isLoading ? cancelGeneration : handleSendMessage} // <-- FIXED
                  disabled={!inputValue.trim() && !isLoading} // <-- FIXED
                  className="bg-[#A259FF] text-white px-4 md:px-6 py-2 md:py-3 rounded-[12px] font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:grayscale disabled:opacity-50"
                >
                  {isLoading ? "✕" : <SendBtn className="w-8 h-8" />}
                </button>
              </div>
            </div>
            {/* <p className="mt-4 text-center text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
              Prompt, code, and design from first idea to final product
            </p> */}
          </div>
        </main>

        {/* Inspector Sidebar */}
        <aside className="hidden xl:flex md:w-64 bg-white border-l border-gray-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase text-gray-400">
              Inspector
            </span>
            <span className="text-[11px] font-bold text-[#A259FF]">
              Dev Mode
            </span>
          </div>
          <div className="p-4 space-y-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase">
                Model Parameters
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Temperature</span>
                  <span className="text-gray-500">{temperature.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#A259FF]"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
