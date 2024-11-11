import Banner from "@/app/(dashboard)/_components/banner";
import { protectServer } from "@/features/auth/utils";

const HomePage = async () => {
  await protectServer();

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col space-y-6 pb-10">
      <Banner />
    </div>
  );
};

export default HomePage;
