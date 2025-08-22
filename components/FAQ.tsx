"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ThumbsUp, MessageCircle, Smile, X } from "lucide-react";

const FAQS = [
  { question: "What sizes are available?", answer: "We offer sizes S-XXL (VAS) for all our products." },
  { question: "Do you ship internationally?", answer: "Currently we ship only within India with plans to expand soon." },
  { question: "What's your return policy?", answer: "30-day return policy for unused items in original packaging." },
  { question: "How long does shipping take?", answer: "3-7 business days across India with free shipping on orders above ₹999." },
  { question: "Is the print quality durable?", answer: "Yes! We use premium printing techniques that last wash after wash." }
];

export default function FAQ() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ [key: number]: "yes" | "no" | null }>({});
  const [showChat, setShowChat] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [chatMessages, setChatMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Hi! 👋 Need more help? Ask me anything about UrbanThread." }
  ]);
  const [chatValue, setChatValue] = useState("");

  // Focus input when chat opens
  useEffect(() => {
    if (showChat && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [showChat]);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleFeedback = (index: number, value: "yes" | "no") => {
    setFeedback((prev) => ({ ...prev, [index]: value }));
  };

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatValue.trim()) return;
    setChatMessages((msgs) => [...msgs, { from: "user", text: chatValue }]);
    // Simulate bot reply
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        {
          from: "bot",
          text:
            "Thanks for your message! Our team will get back to you soon. Meanwhile, check our FAQs above for quick answers."
        }
      ]);
    }, 1200);
    setChatValue("");
  };

  return (
    <section className="py-16 lg:py-20 bg-muted/50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Got questions? We've got answers. <span className="inline-block animate-bounce">👇</span></p>
        </div>
        <div className="max-w-5xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border border-gray-100 hover:border-[#A8B8A0] transition-all duration-300 shadow-sm ${
                activeFAQ === index ? "ring-2 ring-[var(--primary)]" : ""
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between transition-colors focus:outline-none"
                aria-expanded={activeFAQ === index}
                aria-controls={`faq-panel-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {faq.question}
                  {feedback[index] === "yes" && <Smile className="w-4 h-4 text-green-500" />}
                  {feedback[index] === "no" && <MessageCircle className="w-4 h-4 text-red-400" />}
                </h3>
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    activeFAQ === index ? "rotate-90" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-panel-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  activeFAQ === index ? "max-h-96" : "max-h-0"
                }`}
                aria-hidden={activeFAQ !== index}
              >
                {activeFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 mb-4">{faq.answer}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">Was this helpful?</span>
                      <button
                        className={`rounded-full p-2 transition-colors ${
                          feedback[index] === "yes"
                            ? "bg-green-100 text-green-600"
                            : "hover:bg-green-50 text-gray-500"
                        }`}
                        aria-label="Yes"
                        onClick={() => handleFeedback(index, "yes")}
                        disabled={!!feedback[index]}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        className={`rounded-full p-2 transition-colors ${
                          feedback[index] === "no"
                            ? "bg-red-100 text-red-600"
                            : "hover:bg-red-50 text-gray-500"
                        }`}
                        aria-label="No"
                        onClick={() => handleFeedback(index, "no")}
                        disabled={!!feedback[index]}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      {feedback[index] && (
                        <span className="ml-2 text-xs text-gray-400">
                          {feedback[index] === "yes" ? "Thanks for your feedback!" : "We'll improve this answer."}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Floating Chat Button */}
      <button
        className="fixed z-40 bottom-8 right-8 bg-[var(--accent)] text-white rounded-full shadow-lg p-4 hover:bg-[var(--accent)] transition-colors flex items-center gap-2"
        onClick={() => setShowChat(true)}
        aria-label="Open chat"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)" }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline font-medium">Chat</span>
      </button>
      {/* Modern Chat Modal */}
      {showChat && (
        <div className="fixed z-50 bottom-0 right-0 sm:bottom-8 sm:right-8 w-full sm:w-[400px] max-w-full flex justify-end items-end">
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[-1] sm:hidden"
            onClick={() => setShowChat(false)}
            aria-label="Close chat"
          />
          <div className="relative bg-white dark:bg-neutral rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-neutral-700 flex flex-col w-full sm:w-[400px] h-[480px] max-h-[90vh] animate-fadeInUp">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-neutral-700 bg-gradient-to-r from-[var(--accent)]/10 to-white dark:to-neutral">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--accent)]/10">
                  <Smile className="w-6 h-6 text-[var(--accent)]" />
                </span>
                <div>
                  <span className="block font-semibold text-gray-900 dark:text-white text-base">UrbanThread Support</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Typically replies in a few minutes</span>
                </div>
              </div>
              <button
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                onClick={() => setShowChat(false)}
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-zinc-100 dark:bg-neutral-900 custom-scrollbar">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative px-4 py-2 rounded-2xl text-sm max-w-[80%] break-words shadow-sm ${
                      msg.from === "user"
                        ? "bg-[var(--accent)] text-white rounded-br-md"
                        : "bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 text-gray-800 dark:text-gray-100 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <form
              className="flex items-center border-t border-gray-100 dark:border-neutral-700 px-3 py-3 bg-white dark:bg-neutral"
              onSubmit={handleChatSend}
              autoComplete="off"
            >
              <input
                ref={chatInputRef}
                type="text"
                className="flex-1 px-4 py-2 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 focus:outline-none focus:border-[var(--accent)] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition"
                placeholder="Type your question..."
                value={chatValue}
                onChange={(e) => setChatValue(e.target.value)}
                aria-label="Type your question"
                maxLength={300}
              />
              <button
                type="submit"
                className="ml-2 px-5 py-2 bg-[var(--accent)] text-white rounded-2xl hover:bg-[var(--accent)]/90 transition-colors font-semibold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!chatValue.trim()}
                aria-label="Send message"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
