import { useReducer, useEffect, useCallback, useState } from 'react'

const STORAGE_KEY = 'todo-app-v1'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.todo, ...state]
    case 'DELETE':
      return state.filter(t => t.id !== action.id)
    case 'TOGGLE':
      return state.map(t => t.id === action.id ? { ...t, completed: !t.completed } : t)
    case 'EDIT':
      return state.map(t => t.id === action.id ? { ...t, title: action.title } : t)
    case 'REORDER': {
      const from = state.findIndex(t => t.id === action.draggedId)
      const to = state.findIndex(t => t.id === action.targetId)
      if (from === -1 || to === -1 || from === to) return state
      const next = [...state]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      return next
    }
    case 'CLEAR_COMPLETED':
      return state.filter(t => !t.completed)
    default:
      return state
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(reducer, [], () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = useCallback((title, priority = 'medium') => {
    if (!title.trim()) return
    dispatch({
      type: 'ADD',
      todo: {
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        priority,
        createdAt: Date.now(),
      },
    })
  }, [])

  const deleteTodo = useCallback((id) => dispatch({ type: 'DELETE', id }), [])
  const toggleTodo = useCallback((id) => dispatch({ type: 'TOGGLE', id }), [])
  const editTodo = useCallback((id, title) => {
    if (title.trim()) dispatch({ type: 'EDIT', id, title: title.trim() })
  }, [])
  const clearCompleted = useCallback(() => dispatch({ type: 'CLEAR_COMPLETED' }), [])
  const reorderTodos = useCallback((draggedId, targetId) => {
    dispatch({ type: 'REORDER', draggedId, targetId })
  }, [])

  const filteredTodos = todos
    .filter(t => filter === 'all' || (filter === 'active' ? !t.completed : t.completed))
    .filter(t => !search || t.title.toLowerCase().includes(search.toLowerCase()))

  return {
    filteredTodos,
    filter, setFilter,
    search, setSearch,
    addTodo, deleteTodo, toggleTodo, editTodo,
    clearCompleted, reorderTodos,
    stats: {
      total: todos.length,
      active: todos.filter(t => !t.completed).length,
      completed: todos.filter(t => t.completed).length,
    },
  }
}
