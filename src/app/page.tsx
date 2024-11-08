import { protectServer } from "@/features/auth/utils";

const HomePage = async () => {
  await protectServer();

  return <div>You are logged in</div>;
};

export default HomePage;
