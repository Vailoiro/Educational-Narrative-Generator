import { useState, useEffect } from 'react';
import { security } from '../lib/security';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  encrypt = false
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      const parsedItem = encrypt ? security.decryptStorage(item) : item;
      return JSON.parse(parsedItem);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      const serializedValue = JSON.stringify(valueToStore);
      const finalValue = encrypt ? security.encryptStorage(serializedValue) : serializedValue;
      
      window.localStorage.setItem(key, finalValue);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function removeFromStorage(key: string, type: 'local' | 'session' = 'local') {
  try {
    if (type === 'local') {
      window.localStorage.removeItem(key);
    } else {
      window.sessionStorage.removeItem(key);
    }
  } catch (error) {
    console.warn(`Error removing ${type}Storage key "${key}":`, error);
  }
}

export function clearStorage(type: 'local' | 'session' | 'both' = 'both') {
  try {
    if (type === 'local' || type === 'both') {
      window.localStorage.clear();
    }
    if (type === 'session' || type === 'both') {
      window.sessionStorage.clear();
    }
  } catch (error) {
    console.warn(`Error clearing ${type} storage:`, error);
  }
}