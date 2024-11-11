import { useMutation } from "@tanstack/react-query";

export const useCreateProject = () => {
  const mutation = useMutation({
    mutationFn: async ({ json }) => {},
  });

  return mutation;
};
