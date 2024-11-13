"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";
import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const SubscriptionModal = () => {
  const { isOpen, onClose } = useSubscriptionModal();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.png" width={36} height={36} alt="Logo" />
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center">
            Upgrade to a paid plan to unlock more features
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2Icon className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">Unlimited projects</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2Icon className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Unlimited collaborators
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2Icon className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              AI image generation and background removal
            </p>
          </li>
        </ul>
        <DialogFooter className="mt-4 space-y-2 pt-2">
          <Button className="w-full" onClick={() => {}} disabled={false}>
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
