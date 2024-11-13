import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();

  // TODO: This value is being fetched from the API
  const shouldBlock = true;

  return {
    // TODO: Fetch from react-query
    isLoading: false,
    shouldBlock,
    triggerPaywall: () => subscriptionModal.onOpen(),
  };
};
