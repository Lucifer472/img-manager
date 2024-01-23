import { img } from "@prisma/client";
import Image from "next/image";

interface CarosalProps {
  imageData: img[] | null;
}

export const Carosal = ({ imageData }: CarosalProps) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 w-[600px] h-[600px]">
      <div className="flex items-center justify-start gap-4 flex-wrap">
        {imageData &&
          imageData.map((img) => (
            <div
              className="relative w-[130px] h-[130px] hover:scale-110 cursor-pointer"
              key={img.id}
            >
              <Image
                src={`https://img.missiongujarat.in/i/${img.folder}/${img.name}`}
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
