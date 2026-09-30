import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  Send,
  X,
  RotateCcw,
  ArrowRight,
  User,
  ChevronDown,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  chips?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    sender: "assistant",
    text: "👋 **Hello! I'm Silver AI**, your interactive assistant for Silver Pixel Soft.\n\nI can help you explore our **featured projects**, **tech stack**, **client services**, or **pricing**. What would you like to know?",
    timestamp: "Just now",
    chips: [
      "Show featured projects",
      "Tell me about Lio SaaS",
      "What services do you provide?",
      "What is your tech stack?",
      "How can I contact you?",
    ],
  },
];

// Curated Knowledge Base for intelligent responses
const generateAIResponse = (query: string): { reply: string; chips?: string[] } => {
  const q = query.toLowerCase().trim();

  // Projects - General
  if (q.includes("project") || q.includes("work") || q.includes("case stud")) {
    return {
      reply:
        "🚀 **Our Flagship Projects:**\n\n" +
        "1. **Personal Portfolio** — Interactive digital showcase featuring React 19, GSAP orchestration, and Lenis virtual physics.\n" +
        "2. **Lio** — Cloud-native SaaS link management platform with real-time clickstream telemetry and sub-50ms redirection.\n" +
        "3. **Khabri** — High-velocity news aggregator pulling from 50+ global feeds with distraction-free reader mode.\n" +
        "4. **Chat Bot** — AI conversational assistant with streaming token responses & markdown code formatting.\n\n" +
        "Ask me about any specific project (e.g. *'Tell me about Lio'*) or click below!",
      chips: ["Tell me about Lio", "Tell me about Portfolio", "View All Projects page"],
    };
  }

  // Lio
  if (q.includes("lio")) {
    return {
      reply:
        "⚡ **Lio — Cloud-Native Link Management & Telemetry**\n\n" +
        "• **Core Specs**: Sub-50ms URL redirection, distributed edge caching, real-time clickstream analytics.\n" +
        "• **Tech Stack**: React.js, Node.js, Express, MongoDB, Chart.js.\n" +
        "• **Features**: Interactive geo-location telemetry, QR code generation with vector exports, and JWT-authenticated dashboard.\n\n" +
        "Would you like to visit the live app or source code?",
      chips: ["Open Lio live demo", "What tech stack do you use?", "Show other projects"],
    };
  }

  // Personal Portfolio
  if (q.includes("portfolio")) {
    return {
      reply:
        "🎨 **Personal Portfolio — Digital Experience**\n\n" +
        "• **Motion Engine**: GSAP 3 + ScrollTrigger with custom easing.\n" +
        "• **Physics**: Virtual smooth scroll with Lenis (60 FPS).\n" +
        "• **Stack**: React 19, Vite, Tailwind CSS.\n" +
        "• **Highlights**: Physics-based cursor tracking, glassmorphic cards, and zero-layout-shift responsive performance.",
      chips: ["Show featured projects", "Tell me about services", "How to get in touch?"],
    };
  }

  // Khabri
  if (q.includes("khabri") || q.includes("news")) {
    return {
      reply:
        "📰 **Khabri — Global News Content Aggregator**\n\n" +
        "• **Feed Ingestion**: Live REST API ingestion across 50+ international feeds.\n" +
        "• **Performance**: Instant search query debounce (<15ms latency).\n" +
        "• **Reader Mode**: Distraction-free clean reading view optimized for mobile & desktop.\n" +
        "• **Tech Stack**: React 18, Tailwind CSS, News API.",
      chips: ["Tell me about Chat Bot", "Tell me about Lio", "Show services"],
    };
  }

  // Chat Bot
  if (q.includes("chat") || q.includes("bot") || q.includes("llm") || q.includes("ai")) {
    return {
      reply:
        "🤖 **Chat Bot — LLM Conversational Assistant**\n\n" +
        "• **Capabilities**: Real-time token streaming, multi-turn prompt context retention, copyable code blocks with syntax highlighting.\n" +
        "• **Stack**: JavaScript ESNext, OpenRouter/LLM APIs, Server-Sent Events (SSE), CSS3 micro-animations.\n" +
        "• **Deployment**: Production deployed AI web assistant.",
      chips: ["Show featured projects", "What services do you provide?", "Contact us"],
    };
  }

  // Services
  if (q.includes("service") || q.includes("offer") || q.includes("what do you do") || q.includes("help")) {
    return {
      reply:
        "💼 **Services Offered by Silver Pixel Soft:**\n\n" +
        "1. **Full-Stack Web Development** — High-performance, scalable web apps built with modern React, Next.js, and Node.js.\n" +
        "2. **UI/UX & Motion Design** — Award-winning digital experiences, custom design systems, and fluid GSAP micro-interactions.\n" +
        "3. **AI & Agent Integrations** — Custom conversational chatbots, automated AI workflows, and LLM API integrations.\n" +
        "4. **API & SaaS Architecture** — Distributed backend APIs, database design, and cloud deployments.",
      chips: ["What are your pricing plans?", "How can I contact you?", "Show featured projects"],
    };
  }

  // Tech Stack / Skills
  if (q.includes("stack") || q.includes("tech") || q.includes("skill") || q.includes("tool") || q.includes("language")) {
    return {
      reply:
        "🛠️ **Our Core Engineering Stack:**\n\n" +
        "• **Frontend**: React 19, TypeScript, JavaScript (ESNext), Tailwind CSS v4, HTML5/CSS3.\n" +
        "• **Motion & Physics**: GSAP (GreenSock), ScrollTrigger, Lenis Smooth Scroll.\n" +
        "• **Backend & APIs**: Node.js, Express, Python (Flask), RESTful APIs, JWT.\n" +
        "• **Databases & Tools**: MongoDB, Git, Vite, Postman, Vercel.",
      chips: ["Show featured projects", "What services do you provide?", "How can I contact you?"],
    };
  }

  // Contact / Hire
  if (q.includes("contact") || q.includes("hire") || q.includes("reach") || q.includes("email") || q.includes("call")) {
    return {
      reply:
        "📬 **Let's Build Something Exceptional Together!**\n\n" +
        "You can reach out directly via our **Contact Form** at the bottom of the page.\n\n" +
        "• **Email**: Fill out the form in the Contact section.\n" +
        "• **Turnaround**: We typically respond within 24 business hours.\n" +
        "• **Consultations**: We offer initial architecture & project estimation sessions.",
      chips: ["Scroll to Contact Form", "Tell me about pricing", "Show featured projects"],
    };
  }

  // Pricing
  if (q.includes("price") || q.includes("pricing") || q.includes("cost") || q.includes("rate") || q.includes("package")) {
    return {
      reply:
        "💳 **Flexible Project Engagements:**\n\n" +
        "• **Starter / MVP**: Ideal for landing pages, prototypes, and targeted web apps.\n" +
        "• **Professional SaaS**: End-to-end full-stack development, database architecture, and custom UI design.\n" +
        "• **Enterprise / Bespoke**: Complex multi-service platforms, custom AI workflows, and dedicated engineering sprints.\n\n" +
        "Check our **Pricing** section on the homepage or reach out for a custom quotation tailored to your timeline!",
      chips: ["How can I contact you?", "What services do you provide?", "Show featured projects"],
    };
  }

  // Who is Akshay / Silver Pixel Soft
  if (q.includes("who are you") || q.includes("akshay") || q.includes("silver pixel") || q.includes("about")) {
    return {
      reply:
        "✨ **Silver Pixel Soft** is a creative digital engineering studio founded by **Akshay Kumar**.\n\n" +
        "We specialize in crafting bespoke web experiences, fluid interactive interfaces, and robust cloud applications with an obsession for speed, design aesthetics, and modern web standards.",
      chips: ["Show featured projects", "What services do you provide?", "How can I contact you?"],
    };
  }

  // Greeting
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("good morning") || q.includes("good evening")) {
    return {
      reply:
        "👋 Hello! Great to meet you! How can I assist with your software, design, or project requirements today?",
      chips: ["Show featured projects", "What services do you provide?", "Tell me about Lio"],
    };
  }

  // Default fallback
  return {
    reply:
      `Thanks for asking about "${query}"! As Silver AI, I specialize in providing insights into our **projects** (Lio, Portfolio, Khabri, Chat Bot), **engineering stack**, **services**, and **client partnerships**.\n\nWould you like to explore any of these areas?`,
    chips: ["Show featured projects", "What services do you provide?", "How can I contact you?"],
  };
};

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat without affecting window or Lenis
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom("auto"), 50);
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("smooth");
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    // Handle special chip navigation commands
    if (text === "Scroll to Contact Form") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#contact";
      }
      setIsOpen(false);
      return;
    }

    if (text === "View All Projects page") {
      window.location.href = "/all-projects";
      return;
    }

    if (text === "Open Lio live demo") {
      window.open("https://lio-orcin.vercel.app/", "_blank");
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const assistantMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: aiResponse.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        chips: aiResponse.chips,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  // Format assistant markdown text (bold, bullet points, headers)
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Process bold tags (**text**)
          const parts = line.split(/(\*\*.*?\*\*)/g);

          const formattedLine = parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-bold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith("*") && part.endsWith("*")) {
              return (
                <em key={pIdx} className="italic text-sky-200">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          });

          if (line.startsWith("• ") || line.startsWith("- ")) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-sky-400 mt-0.5">•</span>
                <span>{formattedLine}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedLine}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* ========================================================================= */}
      {/* CHAT WINDOW WIDGET                                                       */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="w-[360px] sm:w-[410px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6.5rem)] flex flex-col rounded-3xl bg-[#090d18]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(56,189,248,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 mb-3"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-white/[0.04] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#090d18] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">Silver AI</h3>
                  <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-semibold">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">Portfolio Assistant • Online</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
                title="Minimize assistant"
                aria-label="Minimize assistant"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            data-lenis-prevent="true"
            onWheel={(e) => {
              e.stopPropagation();
              if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop += e.deltaY;
              }
            }}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain select-text"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(56, 189, 248, 0.4) transparent",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-end gap-2 max-w-[85%]">
                  {msg.sender === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 flex-shrink-0 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-3.5 ${
                      msg.sender === "user"
                        ? "bg-gradient-to-tr from-sky-500 to-indigo-600 text-white rounded-br-xs shadow-md shadow-sky-500/20"
                        : "bg-white/[0.05] border border-white/[0.08] text-neutral-200 rounded-bl-xs shadow-sm"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-6 h-6 rounded-full bg-white/[0.08] flex items-center justify-center text-neutral-300 flex-shrink-0 mb-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-neutral-500 mt-1 px-8 font-mono">
                  {msg.timestamp}
                </span>

                {/* Quick Interactive Chips */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 pl-8">
                    {msg.chips.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleSendMessage(chip)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-sky-500/20 border border-white/[0.08] hover:border-sky-400/40 text-[11px] font-medium text-sky-300 transition-all hover:scale-[1.02]"
                      >
                        <span>{chip}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 max-w-[85%]">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-bl-xs px-4 py-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white/[0.02] border-t border-white/[0.08]">
            <div className="flex items-center gap-2 bg-[#030712]/90 border border-white/[0.12] focus-within:border-sky-500/50 rounded-2xl px-3 py-1.5 transition-all shadow-inner">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, stack, services..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none py-1.5"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className={`p-2 rounded-xl transition-all ${
                  inputValue.trim()
                    ? "bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/30 hover:scale-105"
                    : "text-neutral-500 cursor-not-allowed opacity-40"
                }`}
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-2 px-1">
              <span>Silver AI v1.0 • Knowledge Concierge</span>
              <span className="text-sky-400/80">Press Enter ↵</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING TRIGGER BUTTON (CORNER)                                         */}
      {/* ========================================================================= */}
      <div className="relative flex items-center justify-end">
        {/* Tooltip callout when collapsed */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 mr-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-semibold text-neutral-200 hover:text-white hover:border-sky-400/40 shadow-xl transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Ask Silver AI</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-[0_0_30px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.55)] hover:scale-105 ${
            isOpen
              ? "bg-[#090d18] border border-white/20 text-neutral-300 hover:text-white"
              : "bg-gradient-to-tr from-sky-500 via-indigo-600 to-cyan-400 border border-white/25"
          }`}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform rotate-90 duration-200" />
          ) : (
            <>
              <Bot className="w-7 h-7" />
              {/* Online Pulse Indicator */}
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-black"></span>
              </span>
            </>
          )}

          {/* Unread Message Badge if any */}
          {!isOpen && unreadCount > 0 && (
            <span className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-lg">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
