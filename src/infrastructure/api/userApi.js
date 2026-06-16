import { apiClient } from "./axios";

export async function registerUser(userDeviceId) {
  const response = await apiClient.post("/user", { user_device_id: userDeviceId });
  return response.data.data;
}
