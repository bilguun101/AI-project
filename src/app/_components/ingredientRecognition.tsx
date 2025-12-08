"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FileIcon } from "../_icons/fileIcon";
import { Reload } from "../_icons/reload";
import { Stars } from "../_icons/stars";
import { GoogleGenAI } from "@google/genai";

export const IngredientRecognition = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setResult("");

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `List all the ingredients possible mentioned in this text but not the food itself. Don't generate any description. Make a list with bullet marks. If there are no food written in the text, say "No food mentioned."\n\n${text}`,
              },
            ],
          },
        ],
      });

      setResult(response.text ?? "");
    } catch (error: any) {
      setResult("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* header */}
      <div className="flex justify-between pt-6">
        <div className="flex justify-center items-center gap-2 pb-10 ml-1">
          <Stars />
          <p className="text-[20px] font-semibold"> Ingredient recognition </p>
        </div>
        <button className="w-12 h-10 border border-[#E4E4E7] rounded-md cursor-pointer flex justify-center items-center hover:bg-gray-200 duration-200">
          <Reload />
        </button>
      </div>

      {/* description */}
      <div className="text-muted-foreground">
        Describe the food, and AI will detect the ingredients.
      </div>

      {/* textarea */}
      <Textarea
        placeholder="Enter the ingredients..."
        className="w-full h-[124px] border border-[#E4E4E7] rounded-md mt-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* button */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleGenerate}
          className={`text-[#FAFAFA] w-[94px] h-[40px] rounded-md font-medium mt-2 ${
            isLoading
              ? "bg-[#18181B]/30 cursor-wait w-[120px]"
              : "bg-[#18181B] cursor-pointer"
          }`}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* result title */}
      <div className="w-full flex justify-start mt-4">
        <div className="flex justify-center items-center gap-2 ml-1">
          <FileIcon />
          <p className="text-[20px] font-semibold"> Identified Ingredients </p>
        </div>
      </div>

      {/* result text */}
      <div className="text-[#71717A] mt-2 whitespace-pre-wrap">
        {result ? result : "First, enter your text to recognize ingredients."}
      </div>
    </div>
  );
};
