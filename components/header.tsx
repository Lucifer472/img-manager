import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Header = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", poppins.className)}>
        🖥️ Image Manager
      </h1>
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
  );
};

export default Header;
