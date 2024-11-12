import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete project");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`${data.name} deleted successfully`);

      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: ({ message }) => toast.error(`${message}`),
  });

  return mutation;
};
