import { useState, useRef } from 'react'

const PRIORITY_LABELS = { high: '高', medium: '中', low: '低' }

function formatDate(ts) {
  const d = new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function TodoItem({ todo, isDragging, onToggle, onDelete, onEdit, onDragStart, onDrop }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef(null)

  const startEdit = () => {
    setEditing(true)
    setEditValue(todo.title)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const commitEdit = () => {
    setEditing(false)
    onEdit(todo.id, editValue)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') commitEdit()
    else if (e.key === 'Escape') {
      setEditing(false)
      setEditValue(todo.title)
    }
  }

  return (
    <div
      className={[
        'todo-item',
        todo.completed ? 'completed' : '',
        isDragging ? 'dragging' : '',
        isDragOver ? 'drag-over' : '',
      ].filter(Boolean).join(' ')}
      draggable
      onDragStart={() => onDragStart(todo.id)}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragOver(false); onDrop(todo.id) }}
    >
      <span className="drag-handle" title="ドラッグして並べ替え">⠿</span>

      <div
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        role="checkbox"
        aria-checked={todo.completed}
        tabIndex={0}
        onKeyDown={(e) => e.key === ' ' && onToggle(todo.id)}
      />

      <div className={`priority-dot ${todo.priority}`} title={`優先度: ${PRIORITY_LABELS[todo.priority]}`} />

      <div className="todo-content">
        {editing ? (
          <input
            ref={inputRef}
            className="todo-edit-input"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleEditKeyDown}
          />
        ) : (
          <div className="todo-title" onDoubleClick={startEdit} title="ダブルクリックで編集">
            {todo.title}
          </div>
        )}
        <div className="todo-date">{formatDate(todo.createdAt)}</div>
      </div>

      <div className="todo-actions">
        <button className="action-btn" onClick={startEdit} title="編集">✏️</button>
        <button className="action-btn delete" onClick={() => onDelete(todo.id)} title="削除">🗑️</button>
      </div>
    </div>
  )
}
