"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageAnalysis } from "./_components/imageAnalysis";
import { IngredientRecognition } from "./_components/ingredientRecognition";
import { ImageCreator } from "./_components/imageCreator";
import { Message } from "./_icons/message";
import { useState } from "react";
import { ChatBot } from "./_components/chatBot";

export default function Home() {
  const [chat, setChat] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col justify-end items-end">
      <div className="h-full w-full flex flex-col items-center">
        {/* header */}
        <div className="h-18 w-full border-t border-b border-gray-300 flex justify-start items-center pl-12">
          <p className="text-[22px] font-semibold"> AI tools </p>
        </div>
        {/* actual face */}
        <div className="h-full w-[580px] bg-white">
          <Tabs defaultValue="first" className="pt-6">
            <TabsList>
              <TabsTrigger value="first"> Image analysis </TabsTrigger>
              <TabsTrigger value="second"> Ingredient recognition </TabsTrigger>
              <TabsTrigger value="third"> Image creator </TabsTrigger>
            </TabsList>
            {/* ---------------------------------------------------------------------------- */}
            <TabsContent value="first">
              <ImageAnalysis />
            </TabsContent>
            {/* ---------------------------------------------------------------------------- */}
            <TabsContent value="second">
              <IngredientRecognition />
            </TabsContent>
            {/* ---------------------------------------------------------------------------- */}
            <TabsContent value="third">
              <ImageCreator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* ------------------------------chatbot------------------------------- */}
      {!chat ? (
        <button
          className="fixed bottom-10 right-10 bg-black w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#2e2d2d] duration-200 z-50"
          onClick={() => setChat(true)}
        >
          <Message />
        </button>
      ) : (
        <ChatBot setChat={setChat} />
      )}
    </div>
  );
}
