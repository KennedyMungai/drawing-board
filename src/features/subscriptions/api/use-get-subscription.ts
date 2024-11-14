import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  typeof client.api.subscriptions.current.$get,
  200
>;

export const useGetSubscription = () =>
  useQuery<ResponseType, Error>({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await client.api.subscriptions.current.$get();

      if (!response.ok) throw new Error("Failed to fetch subscription");

      return await response.json();
    },
  });
