"use client";
import { useState } from "react";
import { FileIcon } from "../_icons/fileIcon";
import { Reload } from "../_icons/reload";
import { Stars } from "../_icons/stars";
import { ImageInputPart } from "../_AI_components/imageInputPart";
import { WhiteReload } from "../_icons/whiteReload";

export const ImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    setIsGenerating(true);

    const form = new FormData();

    form.append("image", selectedFile);

    const result = await fetch("/api/object-detection", {
      method: "POST",
      body: form,
    });
    const data = await result.json();
    console.log(data);

    setResult(
      `${data.objects.map((cur: { label: string }) => cur.label).join(", ")}`
    );
    setIsGenerating(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between pt-6">
        <div className="flex justify-center items-center gap-2 pb-10 ml-1">
          <Stars />
          <p className="text-[20px] font-semibold"> Image analysis </p>
        </div>
        <button
          className={`w-12 h-10 border border-[#E4E4E7] rounded-md flex justify-center items-center duration-300 ${
            selectedFile ? "bg-[#18181B] cursor-pointer" : "bg-white"
          }`}
          onClick={() => {
            setSelectedFile(null);
            setResult("");
          }}
        >
          {selectedFile ? <WhiteReload /> : <Reload />}
        </button>
      </div>
      <div className="text-muted-foreground">
        Upload a food photo, and AI will detect the ingredients.
      </div>
      <div className="mt-2">
        <ImageInputPart
          selectedFile={selectedFile}
          onFileChange={handleFileChange}
        />
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleGenerate}
          className={` text-[#FAFAFA] w-[94px] h-[40px] rounded-md font-medium mt-2 ${
            isGenerating
              ? "bg-[#18181B]/50 w-[120px] cursor-wait"
              : "bg-[#18181B] cursor-pointer"
          }`}
        >
          {`${isGenerating ? "Generating..." : "Generate"}`}
        </button>
      </div>
      <div className="w-full flex justify-start">
        <div className="flex justify-center items-center gap-2 ml-1">
          <FileIcon />
          <p className="text-[20px] font-semibold"> Here is the summary </p>
        </div>
      </div>
      <div
        className={`mt-2 min-h-10 flex flex-wrap ${
          selectedFile ? "border w-full rounded-md flex items-center pl-3" : ""
        } ${result ? "text-black" : "text-[#71717A]"}`}
      >
        {`${
          result
            ? result
            : isGenerating
            ? "Working..."
            : "First, enter your image to recognize an ingredients."
        }`}
      </div>
    </div>
  );
};
