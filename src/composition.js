import { PostgresGiftRepository } from "./infrastructure/repositories/PostgresGiftRepository";
import {
  createGetGiftsUseCase,
  createCreateGiftUseCase,
  createDeleteGiftUseCase,
  createUpdateGiftUseCase,
} from "./application/useCases/giftUseCases";

const repository = new PostgresGiftRepository();

export const getGifts = createGetGiftsUseCase(repository);
export const createGift = createCreateGiftUseCase(repository);
export const deleteGift = createDeleteGiftUseCase(repository);
export const updateGift = createUpdateGiftUseCase(repository);
