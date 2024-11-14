"use client";

import SidebarItem from "@/app/(dashboard)/_components/sidebar-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCheckout } from "@/features/subscriptions/api/use-checkout";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import {
  CreditCardIcon,
  CrownIcon,
  HomeIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const SidebarRoutes = () => {
  const pathname = usePathname();

  const { mutate: checkout, isPending: isCheckoutPending } = useCheckout();

  const { shouldBlock, isLoading } = usePaywall();

  return (
    <div className="flex flex-1 flex-col gap-y-4">
      {shouldBlock && !isLoading && (
        <>
          <div className="px-3">
            <Button
              onClick={() => checkout()}
              disabled={isCheckoutPending}
              className="w-full rounded-xl border-none transition hover:bg-white hover:opacity-75"
              variant={"outline"}
              size="lg"
            >
              <CrownIcon className="mr-2 size-4 fill-yellow-500 text-yellow-500" />{" "}
              Upgrade to Pro
            </Button>
          </div>
          <Separator className="px-3" />
        </>
      )}

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={HomeIcon}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>
      <Separator className="px-3" />
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href={pathname}
          icon={CreditCardIcon}
          label="Billing"
          onClick={() => {}}
        />
        <SidebarItem
          href={"mailto:kennedymungaifmab@gmail.com"}
          icon={MessageCircleQuestionIcon}
          label="Get Help"
        />
      </ul>
    </div>
  );
};

export default SidebarRoutes;
