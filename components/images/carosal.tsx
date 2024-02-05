import Link from "next/link";
import { img } from "@prisma/client";

import { ImageView } from "@/components/images/Image-view";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CarosalProps {
  imageData: img[] | null;
  link: string;
}

export const Carosal = ({ imageData, link }: CarosalProps) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 w-[600px] h-[600px]">
      <div className="flex items-center justify-center w-full gap-x-4 pb-2 mb-2 border-b border-slate-200">
        <Button
          variant={"link"}
          className={cn("text-lg", link === "blogs" && "shadow-sm")}
          asChild
        >
          <Link href={"/images/blogs"}>Blogs</Link>
        </Button>
        <Button
          variant={"link"}
          className={cn("text-lg", link === "frames" && "shadow-sm")}
          asChild
        >
          <Link href={"/images/frames"}>Frames</Link>
        </Button>
        <Button
          variant={"link"}
          className={cn("text-lg", link === "users" && "shadow-sm")}
          asChild
        >
          <Link href={"/images/users"}>Users</Link>
        </Button>
      </div>
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
