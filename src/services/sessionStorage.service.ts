export const getSessionData = (key: string): string | null => {
  return sessionStorage.getItem(key) || null;
};

export const setSessionData = (key: string, data: string): void => {
  sessionStorage.setItem(key, data);
};

export const removeSessionData = (key: string): void => {
  sessionStorage.removeItem(key);
};

export const clearSessionData = (): void => {
  sessionStorage.clear();
};
