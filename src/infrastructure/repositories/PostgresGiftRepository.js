import { apiClient } from "../api/axios";

export class PostgresGiftRepository {
  async getAll() {
    const response = await apiClient.get("/gift/list");
    return response.data.data;
  }

  async create(gift) {
    const response = await apiClient.post("/gift", {
      title: gift.title,
      user_device_id: gift.createdBy,
    });
    return response.data.data;
  }

  async update(id, title, userDeviceId) {
    const response = await apiClient.put(`/gift/${id}`, {
      title,
      user_device_id: userDeviceId,
    });
    return response.data.data;
  }

  async deleteById(id, userDeviceId) {
    const response = await apiClient.delete(`/gift/${id}`, {
      params: { user_device_id: userDeviceId },
    });
    return response.data.data;
  }
}
