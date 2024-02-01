import { Poppins } from "next/font/google";

import FrameForm from "@/components/websites/frame-form";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const WebsitePage = () => {
  return (
    <div className="w-full h-full flex items-start justify-center gap-x-4 mt-12">
      <div className="bg-white rounded-md shadow-md p-4 w-[600px] h-[600px]">
        <h1
          className={cn(
            "text-xl text-center font-[500] py-2 mb-2 border-b border-slate-100",
            poppins.className
          )}
        >
          Frame Creation
        </h1>
        <FrameForm />
      </div>
    </div>
  );
};

export default WebsitePage;
