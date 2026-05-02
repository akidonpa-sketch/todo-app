import { useState } from 'react'

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title, priority)
      setTitle('')
    }
  }

  return (
    <div className="add-todo">
      <form className="add-todo-form" onSubmit={handleSubmit}>
        <input
          className="add-todo-input"
          type="text"
          placeholder="新しいタスクを追加..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
        <select
          className="priority-select"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="high">🔴 高</option>
          <option value="medium">🟡 中</option>
          <option value="low">🟢 低</option>
        </select>
        <button className="add-btn" type="submit">追加</button>
      </form>
    </div>
  )
}
