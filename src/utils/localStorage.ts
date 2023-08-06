export const getLocalItem = <T>(key: string) => {
  return (typeof window !== 'undefined') && JSON.parse(localStorage.getItem(key)) as T;
};

export const setLocalItem = <T>(key: string, data: T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const removeLocalItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
