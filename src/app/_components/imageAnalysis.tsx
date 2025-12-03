import { FileIcon } from "../_icons/fileIcon";
import { Reload } from "../_icons/reload";
import { Stars } from "../_icons/stars";

export const ImageAnalysis = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between pt-6">
        <div className="flex justify-center items-center gap-2 pb-10 ml-1">
          <Stars />
          <p className="text-[20px] font-semibold"> Image analysis </p>
        </div>
        <button className="w-12 h-10 border border-[#E4E4E7] rounded-md cursor-pointer flex justify-center items-center hover:bg-gray-200 duration-200">
          {" "}
          <Reload />{" "}
        </button>
      </div>
      <div className="text-muted-foreground">
        {" "}
        Upload a food photo, and AI will detect the ingredients.{" "}
      </div>
      <div className="w-full h-10 border border-[#E4E4E7] rounded-md mt-2"></div>
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
          <FileIcon />
          <p className="text-[20px] font-semibold"> Here is the summary </p>
        </div>
      </div>
      <div className="text-[#71717A] mt-2">
        {" "}
        First, enter your image to recognize an ingredients.{" "}
      </div>
    </div>
  );
};
