import { localStore } from './localStore'

const initialTodos = [
    { id: 1, name: 'Do something!', completed: true },
    { id: 2, name: 'Do something else!', completed: false },
  ]
  
// Save list of todos in browser storage, so they can persist!
export const todos = localStore('mdn-svelte-todo', initialTodos)