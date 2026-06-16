import { useEffect, useRef } from "react";
import { getUserId } from "@/infrastructure/localStorage/userIdStorage";
import { registerUser } from "@/infrastructure/api/userApi";

export function useRegisterUser() {
  const userId = getUserId();
  const registered = useRef(false);

  useEffect(() => {
    if (!registered.current) {
      registered.current = true;
      registerUser(userId).catch(() => {});
    }
  }, [userId]);

  return userId;
}
