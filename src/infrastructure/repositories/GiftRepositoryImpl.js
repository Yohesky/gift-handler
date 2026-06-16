import { fetchGifts, createGiftApi, deleteGiftApi } from "../api/giftApi";

export class GiftRepositoryImpl {
  async getAll() {
    return fetchGifts();
  }

  async create(gift) {
    return createGiftApi(gift);
  }

  async update() {
    throw new Error("GiftRepositoryImpl.update not implemented");
  }

  async deleteById(id) {
    return deleteGiftApi(id);
  }
}
