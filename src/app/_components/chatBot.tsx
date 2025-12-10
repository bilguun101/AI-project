"use client";
import { Send } from "../_icons/send";
import { XButton } from "../_icons/xButton";
import { useState, useRef, useEffect } from "react";

type ChatBotProps = {
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
};

type Message = {
  role: "user" | "bot";
  content: string;
};

export const ChatBot = ({ setChat }: ChatBotProps) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });

      const data = await res.json();

      const botMsg: Message = {
        role: "bot",
        content: data.reply ?? "No response",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error: could not contact AI." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed w-[380px] h-[472px] right-10 bottom-10 border border-gray-300 rounded-lg shadow-xl bg-white flex flex-col">
      {/* top */}
      <div className="w-full h-[48px] border-b border-gray-300 flex justify-between items-center pl-4 pr-4">
        <p className="font-medium text-[18px]">Chat assistant</p>
        <button
          className="w-8 h-8 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-200 duration-200"
          onClick={() => setChat(false)}
        >
          <XButton />
        </button>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="w-full h-[368px] overflow-y-auto p-3 space-y-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] p-2 rounded-lg text-sm ${
              msg.role === "user"
                ? "ml-auto bg-black text-white"
                : "mr-auto bg-gray-200"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="mr-auto max-w-[75%] p-2 rounded-lg bg-gray-200 text-sm opacity-70">
            Typing…
          </div>
        )}
      </div>

      {/* bottom */}
      <div className="w-full h-14 flex justify-between items-center pl-4 pr-4 border-t border-gray-300">
        <input
          className="w-[300px] h-10 border border-gray-300 rounded-lg pl-3"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="w-10 h-10 bg-[#18181B] rounded-full flex justify-center items-center cursor-pointer hover:opacity-90 duration-200"
          onClick={sendMessage}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};
