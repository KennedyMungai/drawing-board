import { Button } from "@/components/ui/button";
import { signOutAction } from "@/features/auth/actions/auth-action";
import { protectServer } from "@/features/auth/utils";

const HomePage = async () => {
  await protectServer();

  return (
    <div>
      <form action={signOutAction}>
        <Button>SignOut</Button>
      </form>
    </div>
  );
};

export default HomePage;
