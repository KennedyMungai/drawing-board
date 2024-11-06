import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

export const useGetImages = () =>
  useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await client.api.images.$get();

      if (!response.ok) throw new Error("Failed to fetch images");

      return await response.json();
    },
  });
