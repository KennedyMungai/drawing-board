import { auth } from "@/auth";
import SignUpCard from "@/features/auth/components/signup-card";
import { redirect } from "next/navigation";

const SignOutPage = async () => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <div className="flex h-full items-center justify-center">
      <SignUpCard />
    </div>
  );
};

export default SignOutPage;
