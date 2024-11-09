import { auth } from "@/auth";
import SignInCard from "@/features/auth/components/signin-card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <div className="flex h-full items-center justify-center">
      <SignInCard />
    </div>
  );
};

export default SignInPage;
