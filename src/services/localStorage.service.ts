export const getLocalData = (key: string): string | null => {
  return localStorage.getItem(key) || null;
};

export const setLocalData = (key: string, data: string): void => {
  localStorage.setItem(key, data);
};

export const removeLocalData = (key: string): void => {
  localStorage.removeItem(key);
};

export const clearLocalData = (): void => {
  localStorage.clear();
};
