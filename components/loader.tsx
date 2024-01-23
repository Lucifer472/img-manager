"use client";
import { ClipLoader } from "react-spinners";

const Loader = ({ isPending }: { isPending: boolean }) => {
  return (
    <>
      {isPending && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] rounded-md shadow-md bg-white z-20">
          <div className="w-full min-h-[150px] h-full flex flex-col items-center justify-center gap-y-2">
            <span className="text-muted-foreground text-lg">Loading...</span>
            <ClipLoader
              color="#3671d6"
              cssOverride={{
                borderWidth: "8px",
              }}
              size={60}
            />
          </div>
        </div>
      )}
      {isPending && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black z-10 opacity-50" />
      )}
    </>
  );
};

export default Loader;
