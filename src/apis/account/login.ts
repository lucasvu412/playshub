import { setJwtToken } from "../../utils/storage";
import api from "../axios";

export const login = async (
  telegramId: number,
  displayName: string,
  referralId?: string
) => {
  const response = await api.post("/account/login", {
    telegram_id: telegramId,
    display_name: displayName,
    referral_id: referralId,
  });
  const token = response.data.access_token;
  setJwtToken(token);
  return token;
};
