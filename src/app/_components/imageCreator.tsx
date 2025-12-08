"use client";
import { Textarea } from "@/components/ui/textarea";
import { Reload } from "../_icons/reload";
import { Stars } from "../_icons/stars";
import { Photo } from "../_icons/photo";
import { useState } from "react";

export const ImageCreator = () => {
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!textArea.trim()) return;
    setLoading(true);

    try {
      const data = await (
        await fetch("/api/text-to-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ textArea }),
        })
      ).json();

      if (data.error) {
        console.error(data.error);
      } else if (data.image) {
        setImageUrl(data.image);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between pt-6">
        <div className="flex justify-center items-center gap-2 pb-10 ml-1">
          <Stars />
          <p className="text-[20px] font-semibold"> Food image creator </p>
        </div>
        <button className="w-12 h-10 border border-[#E4E4E7] rounded-md cursor-pointer flex justify-center items-center hover:bg-gray-200 duration-200">
          {" "}
          <Reload />{" "}
        </button>
      </div>
      <div className="text-muted-foreground">
        {" "}
        What food image do you want? Describe it briefly.{" "}
      </div>
      <Textarea
        placeholder="Enter food description..."
        className="w-full h-[130px] border border-[#E4E4E7] rounded-md mt-2"
        onChange={(e) => setTextArea(e.target.value)}
      />
      <div className="w-full flex justify-end">
        <button
          className={`text-[#FAFAFA] w-[94px] h-[40px] rounded-md font-medium mt-2 duration-200 ${
            textArea.length > 0
              ? "bg-[#18181B] cursor-pointer"
              : "bg-[#18181B]/50"
          } ${
            loading
              ? "bg-[#18181B]/50 w-[120px]"
              : "bg-[#18181B] cursor-pointer"
          }`}
          onClick={handleGenerate}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      <div className="w-full flex justify-start">
        <div className="flex justify-center items-center gap-2 ml-1">
          <Photo />
          <p className="text-[20px] font-semibold"> Result </p>
        </div>
      </div>
      <div>
        {!imageUrl ? (
          <p className="text-[#71717A] mt-2">
            {" "}
            First, enter your text to generate an image.{" "}
          </p>
        ) : (
          <img
            src={imageUrl}
            alt="Generated image"
            className="mt-4 w-full rounded-md border"
          />
        )}
      </div>
    </div>
  );
};
