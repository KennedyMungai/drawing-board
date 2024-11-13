import { client } from "@/lib/hc";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  typeof client.api.subscriptions.checkout.$post,
  200
>;

export const useCheckout = () =>
  useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscriptions.checkout.$post();

      if (!response.ok) throw new Error("Failed to create a session");

      return await response.json();
    },
    onSuccess: ({ data }) => (window.location.href = data),
    onError: () => toast.error("Failed to create session"),
  });
