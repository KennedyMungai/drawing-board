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
import { useFailModal } from "@/features/subscriptions/store/use-fail-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FailModal = () => {
  const router = useRouter();

  const { isOpen, onClose } = useFailModal();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  const handleClose = () => {
    router.replace("/");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.png" width={36} height={36} alt="Logo" />
          <DialogTitle className="text-center">
            Something went wrong
          </DialogTitle>
          <DialogDescription className="text-center">
            We could not process your payment
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 space-y-2 pt-2">
          <Button className="w-full" onClick={handleClose}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FailModal;
