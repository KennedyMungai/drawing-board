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
import { useSuccessModal } from "@/features/subscriptions/store/use-success-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessModal = () => {
  const router = useRouter();

  const { isOpen, onClose } = useSuccessModal();

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
            Subscription successful
          </DialogTitle>
          <DialogDescription className="text-center">
            You have successfully subscribed to our service
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

export default SuccessModal;
