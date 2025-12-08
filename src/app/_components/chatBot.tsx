"use client";
import { Send } from "../_icons/send";
import { XButton } from "../_icons/xButton";
import { useState } from "react";

type ChatBotProps = {
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChatBot = ({ setChat }: ChatBotProps) => {
  const [text, setText] = useState("");

  return (
    <div className="fixed w-[380px] h-[472px] right-10 bottom-10 border border-gray-300 rounded-lg shadow-xl">
      {/* top */}
      <div className="w-full h-[48px] border-b border-gray-300 flex justify-between items-center pl-4 pr-4">
        <p className="font-medium text-[18px]"> Chat assistant </p>
        <button
          className="w-8 h-8 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-200 duration-200"
          onClick={() => setChat(false)}
        >
          <XButton />
        </button>
      </div>
      {/* medium */}
      <div className="w-full h-[368px]"></div>
      {/* bottom */}
      <div className="w-full h-14 flex justify-between items-center pl-4 pr-4 border-t border-gray-300">
        <input
          className="w-[300px] h-10 border border-gray-300 rounded-lg pl-3"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="w-10 h-10 bg-[#18181B] rounded-full flex justify-center items-center cursor-pointer hover:opacity-90 duration-200"
          onClick={() => {
            setText("");
          }}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};
