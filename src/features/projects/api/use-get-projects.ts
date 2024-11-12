import { client } from "@/lib/hc";
import { useInfiniteQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.projects.$get, 200>;

export const useGetProjects = () =>
  useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    queryKey: ["projects"],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: async ({ pageParam }) => {
      const response = await client.api.projects.$get({
        query: {
          page: (pageParam as number).toString(),
          limit: "5",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch projects");

      return await response.json();
    },
  });
