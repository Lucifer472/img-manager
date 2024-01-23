import { fetchImages } from "@/actions/fetch";
import { Carosal } from "@/components/images/carosal";
import { ImageForm } from "@/components/images/imge-form";

export const revalidate = 0;

const ImagesPage = async () => {
  const data = await fetchImages("public/blogs/");

  return (
    <div className="w-full h-full flex items-start justify-center gap-x-4 mt-12">
      <Carosal imageData={data} />
      <ImageForm />
    </div>
  );
};

export default ImagesPage;
