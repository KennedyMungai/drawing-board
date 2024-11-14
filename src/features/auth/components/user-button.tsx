"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import {
  CreditCardIcon,
  CrownIcon,
  LoaderIcon,
  LogOutIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { signOutAction } from "../actions/auth-action";

const UserButton = () => {
  const session = useSession();

  const { shouldBlock, isLoading } = usePaywall();

  if (session.status === "loading")
    return <LoaderIcon className="size-5 animate-spin text-muted-foreground" />;

  if (session.status === "unauthenticated" || !session.data) return null;

  const name = session.data?.user?.name;
  const imageUrl = session.data?.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="relative outline-none">
        <Avatar className="size-10 cursor-pointer transition hover:opacity-75">
          {!shouldBlock && !isLoading && (
            <div className="absolute left-2.5 top-2.5 z-10 flex items-center justify-center">
              <div className="flex items-center justify-center rounded-full bg-white p-1 drop-shadow-sm">
                <CrownIcon className="size-3 fill-yellow-500 text-yellow-500" />
              </div>
            </div>
          )}
          <AvatarImage alt={name ?? ""} src={imageUrl ?? ""} />
          <AvatarFallback className="flex items-center justify-center bg-blue-500 font-medium text-white">
            {name?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem className="h-10" disabled={false} onClick={() => {}}>
          <CreditCardIcon className="mr-2 size-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="h-10"
          disabled={false}
          onClick={signOutAction}
        >
          <LogOutIcon className="mr-2 size-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
