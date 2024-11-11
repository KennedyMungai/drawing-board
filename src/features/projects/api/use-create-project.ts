import { client } from "@/lib/hc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.projects.$post>;
type RequestType = InferRequestType<typeof client.api.projects.$post>;

export const useCreateProject = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.projects.$post({ json });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Project created");

      //   TODO: Invalidate project query
    },
    onError: () => toast.error("Failed to create project"),
  });

  return mutation;
};
