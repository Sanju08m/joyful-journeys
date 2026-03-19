import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import chatbotIcon from "@/assets/chatbot-icon.jpeg";

const faqData = [
  {
    keywords: ["date", "venue", "where", "when", "location", "place"],
    answer: "The symposium is scheduled for March 18, at B.Tech - IT, Asian College of Engineering and Technology.",
  },
  {
    keywords: ["events", "available", "what events", "list"],
    answer: "We have both Technical and Non-Technical events.\n\n**Technical:** PPT, Code Debugging, Brain Quiz, Reverse Coding, and UI Design.\n\n**Non-Technical:** Power Lift, IPL Auction, Treasure Hunt, Logo Guess, and E-Sportz.\n\n**Group Events:** Talent Show (dance, sing, mimicry).",
  },
  {
    keywords: ["multiple", "more than one", "many events"],
    answer: "Yes! As long as the event timings don't overlap, you are free to participate in multiple events.",
  },
  {
    keywords: ["register", "how to register", "registration process", "sign up"],
    answer: 'You can register through the "Register" button on our home page.',
  },
  {
    keywords: ["fee", "cost", "price", "how much", "registration fee"],
    answer: "The general registration fee is ₹149 per head, which covers Lunch, Participation Certificate, and 2x refreshments.",
  },
  {
    keywords: ["spot", "spot registration", "on the day"],
    answer: "Yes, spot registration is available until 11:30 AM on the day of the event, but we recommend online registration to avoid the rush!",
  },
  {
    keywords: ["certificate", "certificates"],
    answer: 'Yes, all participants will receive a "Certificate of Participation," and winners will get "Certificates of Merit" along with prizes.',
  },
  {
    keywords: ["lunch", "food", "refreshment", "eat"],
    answer: "Yes, delicious lunch and refreshments are included in the registration fee.",
  },
  {
    keywords: ["contact", "phone", "call", "reach", "coordinator", "details"],
    answer: "Student Coordinators:\n• Sarathi — 9025587886\n• Keerthana — 8838570776\n\nStaff Coordinators:\n• Sneha — 8526382792\n• Aravind — 9894304896",
  },
  {
    keywords: ["developer", "who made", "website developer", "who built", "who created"],
    answer: "MONKEY_D_SANJU\n📧 ksanjay14796@gmail.com",
  },
];

function getAnswer(question: string): string {
  const q = question.toLowerCase();
  for (const faq of faqData) {
    if (faq.keywords.some((kw) => q.includes(kw))) {
      return faq.answer;
    }
  }
  return "Sorry, I can only answer questions about our symposium. Try asking about events, registration, fees, venue, or certificates!";
}

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Ahoy! 🏴‍☠️ I'm your symposium assistant. Ask me anything about our events!", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { text: trimmed, isUser: true };
    const botMsg: Message = { text: getAnswer(trimmed), isUser: false };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 overflow-hidden p-0 border-0"
          aria-label="Open chat"
        >
          <img src={chatbotIcon} alt="Chat" className="w-full h-full object-cover" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl border border-border flex flex-col" style={{ height: "28rem", background: "hsl(var(--card))" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border" style={{ background: "hsl(var(--gold))" }}>
            <span className="font-display font-bold tracking-wide" style={{ color: "hsl(var(--background))" }}>
              🏴‍☠️ Event Bot
            </span>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity" style={{ color: "hsl(var(--background))" }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${
                    msg.isUser
                      ? "rounded-br-sm"
                      : "rounded-bl-sm"
                  }`}
                  style={{
                    background: msg.isUser ? "hsl(var(--gold))" : "hsl(var(--muted))",
                    color: msg.isUser ? "hsl(var(--background))" : "hsl(var(--foreground))",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about events..."
              className="flex-1 rounded-full px-4 py-2 text-sm outline-none border border-border focus:border-gold transition-colors"
              style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-opacity hover:opacity-80"
              style={{ background: "hsl(var(--gold))", color: "hsl(var(--background))" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
