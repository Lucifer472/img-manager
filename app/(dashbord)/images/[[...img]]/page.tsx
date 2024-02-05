import dynamic from "next/dynamic";

import { Carosal } from "@/components/images/carosal";
import { readImages } from "@/lib/img";

export const revalidate = 0;

const ImagesPage = async ({ params }: { params: { img?: string[] } }) => {
  // @ts-ignore
  let routes: [vale: string, vale2: number, vale3: string | undefined | null] =
    [];

  if (params.img) {
    if (params.img[0]) {
      routes.push(params.img[0]);
    } else {
      routes.push("blogs");
    }

    if (params.img[1]) {
      if (isNaN(parseInt(params.img[1]))) {
        routes.push(1);
      } else {
        routes.push(parseInt(params.img[1]));
      }
    } else {
      routes.push(1);
    }

    if (params.img[2]) {
      routes.push(params.img[2]);
    }
  }

  const data = await readImages(routes[0], routes[1] - 1);

  const ImageForm = dynamic(() => import("@/components/images/imge-form"), {
    ssr: false,
  });

  return (
    <div className="w-full h-full flex items-start justify-center gap-x-4 mt-12">
      <Carosal imageData={data} link={routes[0]} />
      <ImageForm />
    </div>
  );
};

export default ImagesPage;
