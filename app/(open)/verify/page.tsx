import dynamic from "next/dynamic";

const VerifyPage = () => {
  const VerifyEmail = dynamic(() => import("@/components/auth/VerifyEmail"), {
    ssr: false,
  })

  return (
    <div className="w-full h-full flex items-center justify-center">
      <VerifyEmail />
    </div>
  );
};

export default VerifyPage;
