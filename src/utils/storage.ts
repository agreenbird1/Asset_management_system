const PREFIX = "tqt";

const autoPrefix = (key: string) => {
  return PREFIX + "_" + key;
};

export default {
  // localstorage
  setStorage(key: string, val: unknown) {
    window.localStorage.setItem(autoPrefix(key), JSON.stringify(val));
  },
  getStorage<T>(key: string): T | undefined {
    const storageItem = window.localStorage.getItem(autoPrefix(key));
    if (storageItem) return <T>JSON.parse(storageItem);
  },
  deleteStorage(key: string) {
    window.localStorage.removeItem(autoPrefix(key));
  },
  clearStorage() {
    window.localStorage.clear();
  },

  // sessionStorage
  setSession(key: string, val: unknown) {
    window.sessionStorage.setItem(autoPrefix(key), JSON.stringify(val));
  },
  getSession<T>(key: string): T | undefined {
    const storageItem = window.sessionStorage.getItem(autoPrefix(key));
    if (storageItem) return <T>JSON.parse(storageItem);
  },
  deleteSession(key: string) {
    window.sessionStorage.removeItem(autoPrefix(key));
  },
  clearSession() {
    window.sessionStorage.clear();
  },
};