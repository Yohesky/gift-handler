import { apiClient } from "../api/axios";
import { Gift } from "../../domain/entities/Gift";

export class PostgresGiftRepository {
  async getAll() {
    const response = await apiClient.get("/gift/list");
    return response.data.data.map(Gift.fromApi);
  }

  async create(gift) {
    const response = await apiClient.post("/gift", {
      title: gift.name,
      user_device_id: gift.createdBy,
    });
    return Gift.fromApi(response.data.data);
  }

  async update(id, title, userDeviceId) {
    const response = await apiClient.put(`/gift/${id}`, {
      title,
      user_device_id: userDeviceId,
    });
    return Gift.fromApi(response.data.data);
  }

  async deleteById(id, userDeviceId) {
    const response = await apiClient.delete(`/gift/${id}`, {
      params: { user_device_id: userDeviceId },
    });
    return response.data.data.map(Gift.fromApi);
  }
}
