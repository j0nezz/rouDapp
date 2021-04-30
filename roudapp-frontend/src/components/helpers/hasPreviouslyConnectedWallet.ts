const STORAGE_KEY = "roudapp_connected";

export const hasPreviouslyConnectedWallet = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) === "true";
};

export const setHasPreviouslyConnectedWallet = () => {
  localStorage.setItem(STORAGE_KEY, "true");
};
