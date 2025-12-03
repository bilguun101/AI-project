import { Textarea } from "@/components/ui/textarea";
import { Reload } from "../_icons/reload";
import { Stars } from "../_icons/stars";
import { Photo } from "../_icons/photo";

export const ImageCreator = () => {
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
      />
      <div className="w-full flex justify-end">
        <button
          className={`bg-[#18181B]/50 text-[#FAFAFA] w-[94px] h-[40px] rounded-md font-medium mt-2`}
        >
          {" "}
          Generate{" "}
        </button>
      </div>
      <div className="w-full flex justify-start">
        <div className="flex justify-center items-center gap-2 ml-1">
          <Photo />
          <p className="text-[20px] font-semibold"> Result </p>
        </div>
      </div>
      <div className="text-[#71717A] mt-2">
        {" "}
        First, enter your text to generate an image.{" "}
      </div>
    </div>
  );
};
