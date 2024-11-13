import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType } from "hono";

type RequestType = InferRequestType<
  typeof client.api.projects.templates.$get
>["query"];

export const useGetTemplates = (apiQuery: RequestType) =>
  useQuery({
    queryKey: ["templates", { page: apiQuery.page, limit: apiQuery.limit }],
    queryFn: async () => {
      const response = await client.api.projects.templates.$get({
        query: apiQuery,
      });

      if (!response.ok) throw new Error("Failed to fetch templates");

      return await response.json();
    },
  });
