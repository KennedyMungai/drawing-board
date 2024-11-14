"use client";

import { useFailModal } from "@/features/subscriptions/store/use-fail-modal";
import { useSuccessModal } from "@/features/subscriptions/store/use-success-modal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SubscriptionAlert = () => {
  const { onOpen: onOpenFail } = useFailModal();
  const { onOpen: onOpenSuccess } = useSuccessModal();

  const [isMounted, setIsMounted] = useState(false);

  const searchParams = useSearchParams();

  const cancelled = searchParams.get("success") === "false";
  const success = searchParams.get("success") === "true";

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (cancelled) onOpenFail();

    if (success) onOpenSuccess();
  }, [cancelled, onOpenFail, success, onOpenSuccess]);

  if (!isMounted) return null;

  return null;
};

export default SubscriptionAlert;
