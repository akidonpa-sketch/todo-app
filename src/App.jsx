import { useState } from 'react'
import { useTodos } from './hooks/useTodos'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  const {
    filteredTodos, filter, setFilter, search, setSearch,
    addTodo, deleteTodo, toggleTodo, editTodo,
    clearCompleted, reorderTodos, stats,
  } = useTodos()

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
  }

  const EMPTY_MESSAGES = {
    search: { icon: '🔍', text: '検索結果がありません' },
    completed: { icon: '🎉', text: '完了済みのタスクはありません' },
    active: { icon: '✨', text: '未完了のタスクはありません' },
    all: { icon: '📝', text: 'タスクを追加してみましょう！' },
  }

  const emptyKey = search ? 'search' : filter
  const empty = EMPTY_MESSAGES[emptyKey]

  return (
    <div className="app" data-theme={theme}>
      <div className="container">
        <Header stats={stats} theme={theme} onToggleTheme={toggleTheme} />
        <AddTodo onAdd={addTodo} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          completedCount={stats.completed}
          onClearCompleted={clearCompleted}
        />
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">{empty.icon}</span>
            <p>{empty.text}</p>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onReorder={reorderTodos}
          />
        )}
      </div>
    </div>
  )
}
