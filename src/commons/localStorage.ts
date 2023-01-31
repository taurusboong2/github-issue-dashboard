export const getItem = (key: string): string | null => {
  let rawValue;
  if (typeof window !== 'undefined') {
    rawValue = localStorage.getItem(key);
  }
  if (!rawValue) return null;
  try {
    return rawValue;
  } catch (error) {
    return null;
  }
};

export const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
