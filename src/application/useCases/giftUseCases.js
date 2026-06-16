import { getUserId } from "../services/userIdService";

export function createGetGiftsUseCase(giftRepository) {
  return async function getGifts() {
    return giftRepository.getAll() ?? [];
  };
}

export function createCreateGiftUseCase(giftRepository) {
  return async function createGift(name) {
    const createdBy = getUserId();
    return giftRepository.create({ name, createdBy });
  };
}

export function createUpdateGiftUseCase(giftRepository) {
  return async function updateGift(id, name) {
    const userId = getUserId();
    return giftRepository.update(id, name, userId);
  };
}

export function createDeleteGiftUseCase(giftRepository) {
  return async function deleteGift(id) {
    const userId = getUserId();
    return giftRepository.deleteById(id, userId);
  };
}
