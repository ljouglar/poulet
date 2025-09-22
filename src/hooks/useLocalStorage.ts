import { useState } from 'react';

/**
 * Hook personnalisé pour gérer le localStorage avec gestion d'erreurs
 * @param key - Clé du localStorage
 * @param defaultValue - Valeur par défaut si aucune valeur n'existe
 * @returns [value, setValue] - Tuple avec la valeur et la fonction de mise à jour
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: T | ((prev: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage item "${key}":`, error);
    }
  };

  return [value, setStoredValue];
}
