// Creation of a localStore for purpose of writing to browser's local storage
import { writable } from 'svelte/store';

// Get key of local storage and initital value.
export const localStore = (key, initial) => {

  // Helper functions for string to object and object to string conversion,
  const toString = (value) => JSON.stringify(value, null, 2)
  const toObj = JSON.parse

  // If item not in storage, initialize is with our value.
  if (localStorage.getItem(key) === null) {                  
    localStorage.setItem(key, toString(initial))
  }

  // str -> obj
  const saved = toObj(localStorage.getItem(key))

  // Creating writable store.   
  const { subscribe, set, update } = writable(saved)

  return {
    subscribe,
    set: (value) => {
      // save to local storage (obj -> str)
      localStorage.setItem(key, toString(value))
      return set(value)
    },
    update
  }
}