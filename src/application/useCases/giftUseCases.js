import { getUserId } from "../services/userIdService";

export function createGetGiftsUseCase(giftRepository) {
  return async function getGifts() {
    return giftRepository.getAll() ?? [];
  };
}

export function createCreateGiftUseCase(giftRepository) {
  return async function createGift(name) {
    const createdBy = getUserId();
    const gift = {
      id: crypto.randomUUID(),
      name,
      status: "available",
      createdBy,
      createdAt: new Date().toISOString(),
    };
    return giftRepository.create(gift);
  };
}

export function createDeleteGiftUseCase(giftRepository) {
  return async function deleteGift(id) {
    return giftRepository.deleteById(id);
  };
}
