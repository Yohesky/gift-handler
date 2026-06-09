/**
 * @interface GiftRepository
 * Repository contract defined by the domain layer.
 * Infrastructure layer must implement these methods.
 *
 * @method {Promise<Gift[]>} getAll - Fetch all gifts
 * @method {Promise<Gift>} create - Create a new gift
 * @method {Promise<void>} deleteById - Delete a gift by ID
 */
export const GiftRepository = {
  getAll: async () => {
    throw new Error("GiftRepository.getAll not implemented");
  },
  create: async () => {
    throw new Error("GiftRepository.create not implemented");
  },
  deleteById: async () => {
    throw new Error("GiftRepository.deleteById not implemented");
  },
};
