interface ImageInputPartProps {
  selectedFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageInputPart = ({
  selectedFile,
  onFileChange,
}: ImageInputPartProps) => {
  if (selectedFile) {
    return (
      <div className="border border-slate-300 rounded-lg p-4">
        <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-10 border border-[#E4E4E7] rounded-md">
      <label className="relative w-full h-full rounded-md flex justify-start items-center pl-7">
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={onFileChange}
          className="absolute w-full h-full opacity-0"
        />
        <div className="">
          <span className="text-sm font-medium text-slate-900">
            Choose file
          </span>
          <span className="text-sm text-slate-500 ml-2">JPG, PNG</span>
        </div>
      </label>
    </div>
  );
};
