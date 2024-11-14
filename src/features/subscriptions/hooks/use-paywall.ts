import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";

export const usePaywall = () => {
  const { data: subscriptionData, isLoading: isLoadingSubscriptionData } =
    useGetSubscription();

  const subscriptionModal = useSubscriptionModal();

   const shouldBlock = isLoadingSubscriptionData || !subscriptionData?.isActive;

  return {
    isLoading: isLoadingSubscriptionData,
    shouldBlock,
    triggerPaywall: () => subscriptionModal.onOpen(),
  };
};
