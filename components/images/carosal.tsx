import Image from "next/image";

interface CarosalProps {
  imageData: string[];
}

export const Carosal = ({ imageData }: CarosalProps) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 w-[600px] h-[600px]">
      <div className="flex items-center justify-start gap-4 flex-wrap">
        {imageData.map((img, index) => (
          <div
            className="relative w-[130px] h-[130px] hover:scale-110 cursor-pointer"
            key={index}
          >
            <Image
              src={`/i/blogs/${img}`}
              alt="Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
