import { protectServer } from "@/features/auth/utils";

const HomePage = async () => {
  await protectServer();

  return <div>Home Page</div>;
};

export default HomePage;
