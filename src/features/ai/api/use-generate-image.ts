import { client } from "@/lib/hc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.ai)["generate-image"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.ai)["generate-image"]["$post"]
>;

export const useGenerateImage = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.ai["generate-image"].$post({
        json,
      });

      return await response.json();
    },
    onSettled: () =>
      toast.success("I am not paying AI billing for a hobby project"),
  });

  return mutation;
};
