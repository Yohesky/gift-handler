import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGifts, createGift, deleteGift, updateGift } from "../../composition";

export function useGifts() {
  return useQuery({
    queryKey: ["gifts"],
    queryFn: getGifts,
  });
}

export function useCreateGift() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
    },
  });
}

export function useUpdateGift() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }) => updateGift(id, name),
    onMutate: async ({ id, name }) => {
      await queryClient.cancelQueries({ queryKey: ["gifts"] });
      const previous = queryClient.getQueryData(["gifts"]);
      queryClient.setQueryData(["gifts"], (old) =>
        old?.map((g) => (String(g.id) === String(id) ? { ...g, name } : g))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["gifts"], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
    },
  });
}

export function useDeleteGift() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGift,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["gifts"] });
      const previous = queryClient.getQueryData(["gifts"]);
      queryClient.setQueryData(["gifts"], (old) =>
        old?.filter((g) => String(g.id) !== String(id))
      );
      return { previous };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["gifts"], data);
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["gifts"], context.previous);
    },
  });
}
