import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const localStorage = typeof window !== 'undefined' ? window.localStorage : null;
  const [value, _setValue] = useState(() => {
    const item = localStorage?.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      _setValue(localStorage?.getItem(key) || initialValue);
    }
  }, []);

  const setValue = (value: string) => {
    localStorage?.setItem(key, JSON.stringify(value));
    _setValue(value);
  };

  const removeValue = () => {
    localStorage?.removeItem(key);
    _setValue(initialValue);
  };

  const clearAll = () => {
    localStorage?.clear();
    _setValue(initialValue);
  };

  return { value, setValue, removeValue, clearAll };
};
