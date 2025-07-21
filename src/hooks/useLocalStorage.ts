import { useState } from 'react'

type StorageValue<T> = T | null

export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [StorageValue<T>, (value: T | null) => void] {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

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