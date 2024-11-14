import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscription = () =>
  useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await client.api.subscriptions.current.$get();

      if (!response.ok) throw new Error("Failed to fetch subscription");

      return await response.json();
    },
  });
