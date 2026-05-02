import { useState } from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onDelete, onEdit, onReorder }) {
  const [draggedId, setDraggedId] = useState(null)

  const handleDragStart = (id) => setDraggedId(id)

  const handleDrop = (targetId) => {
    if (draggedId && draggedId !== targetId) {
      onReorder(draggedId, targetId)
    }
    setDraggedId(null)
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isDragging={draggedId === todo.id}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  )
}
