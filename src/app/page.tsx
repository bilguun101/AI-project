import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageAnalysis } from "./_components/imageAnalysis";
import { IngredientRecognition } from "./_components/ingredientRecognition";
import { ImageCreator } from "./_components/imageCreator";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center">
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
  );
}
