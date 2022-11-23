const ls = (key) => {
  return {
    get: () => {
      const value = localStorage.getItem(key);
      try {
        return value ? JSON.parse(value) : value;
      } catch (e) {
        return value;
      }
    },
    set: (value) => {
      const _value = value ? JSON.stringify(value) : value;
      localStorage.setItem(key, _value);
    },
    remove: () => {
      localStorage.removeItem(key);
    },
    listen: (callback) => {
      const listener = (event) => {
        if (event.key === key || event.key === null) {
          try {
            const value = event.newValue
              ? JSON.parse(event.newValue)
              : event.newValue;
            callback(value);
          } catch (e) {
            callback(event.newValue || null);
          }
        }
      };
      window.addEventListener("storage", listener);
    },
  };
};

export const cart = ls("cart");
export const filtering = ls("filtering");
export const token = ls("token");
