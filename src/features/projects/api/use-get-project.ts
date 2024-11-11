import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

export const useGetProject = (projectId: string) =>
  useQuery({
    enabled: !!projectId,
    queryKey: ["project", { projectId }],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"].$get({
        param: {
          projectId,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch project");

      return await response.json();
    },
  });
