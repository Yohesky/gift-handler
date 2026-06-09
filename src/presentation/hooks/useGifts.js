import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createGetGiftsUseCase, createCreateGiftUseCase, createDeleteGiftUseCase } from "../../application/useCases/giftUseCases";
import { GiftRepositoryImpl } from "../../infrastructure/repositories/GiftRepositoryImpl";

const giftRepository = new GiftRepositoryImpl();
const getGiftsUseCase = createGetGiftsUseCase(giftRepository);
const createGiftUseCase = createCreateGiftUseCase(giftRepository);
const deleteGiftUseCase = createDeleteGiftUseCase(giftRepository);

export function useGifts() {
  return useQuery({
    queryKey: ["gifts"],
    queryFn: getGiftsUseCase,
  });
}

export function useCreateGift() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGiftUseCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
    },
  });
}

export function useDeleteGift() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGiftUseCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
    },
  });
}
