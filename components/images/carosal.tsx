import { img } from "@prisma/client";
import { ImageView } from "./Image-view";

interface CarosalProps {
  imageData: img[] | null;
}

export const Carosal = ({ imageData }: CarosalProps) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 w-[600px] h-[600px]">
      <div className="flex items-center justify-start gap-4 flex-wrap">
        {imageData &&
          imageData.map((img) => (
            <ImageView
              key={img.id}
              folder={img.folder}
              imgName={img.name}
              url="img.missiongujarat.in"
              id={img.id}
            />
          ))}
      </div>
    </div>
  );
};
