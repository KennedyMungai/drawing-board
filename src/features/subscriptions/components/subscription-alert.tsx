"use client";

import { useFailModal } from "@/features/subscriptions/store/use-fail-modal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SubscriptionAlert = () => {
  const { onOpen: onOpenFail } = useFailModal();

  const [isMounted, setIsMounted] = useState(false);

  const searchParams = useSearchParams();

  const cancelled = searchParams.get("success") === "false";

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (cancelled) onOpenFail();
  }, [cancelled, onOpenFail]);

  if (!isMounted) return null;

  return null;
};

export default SubscriptionAlert;
