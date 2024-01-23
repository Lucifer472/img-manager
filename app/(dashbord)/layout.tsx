import { Navbar } from "@/components/Navbar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default DashBoardLayout;
