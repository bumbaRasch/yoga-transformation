import { useState, useEffect } from 'react'

type StorageValue<T> = T | null

export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [StorageValue<T>, (value: T | null) => void] {
  // SSR-safe initialization - always use initialValue on first render
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(initialValue)

  // After hydration, sync with localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  // Set value in state and localStorage
  const setValue = (value: T | null) => {
    try {
      setStoredValue(value)
      
      if (typeof window !== 'undefined') {
        if (value === null) {
          window.localStorage.removeItem(key)
        } else {
          window.localStorage.setItem(key, JSON.stringify(value))
        }
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}