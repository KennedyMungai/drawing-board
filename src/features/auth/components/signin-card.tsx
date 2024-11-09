import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import {
  githubSigninAction,
  googleSigninAction,
} from "@/features/auth/actions/auth-action";

const SignInCard = () => {
  return (
    <Card className="p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to Continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <form action={googleSigninAction} className="w-full">
            <Button variant={"outline"} size="lg" className="relative w-full">
              <FcGoogle className="absolute left-2" /> Continue with Google
            </Button>
          </form>
          <form action={githubSigninAction}>
            <Button variant={"outline"} size="lg" className="relative w-full">
              <FaGithub className="absolute left-2" /> Continue with Github
            </Button>
          </form>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <span className="text-sky-700 hover:underline">Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
