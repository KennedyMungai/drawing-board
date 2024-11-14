"use client";

import FailModal from "@/features/subscriptions/components/fail-modal";
import SubscriptionModal from "@/features/subscriptions/components/subscription-modal";
import { useEffect, useState } from "react";

const ModalsProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <SubscriptionModal />
      <FailModal />
    </>
  );
};

export default ModalsProvider;
