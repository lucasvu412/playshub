export default function useTelegramUser() {
  if (import.meta.env.MODE === "development") {
    return {
      id: "806376326",
    };
  }
  return Telegram?.WebApp?.initDataUnsafe?.user;
}
