const FILTERS = [
  { key: 'all', label: '全て' },
  { key: 'active', label: '未完了' },
  { key: 'completed', label: '完了済み' },
]

export default function FilterBar({ filter, setFilter, search, setSearch, completedCount, onClearCompleted }) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-tab ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <input
        className="search-input"
        type="text"
        placeholder="🔍 検索..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {completedCount > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          完了済みを削除 ({completedCount})
        </button>
      )}
    </div>
  )
}
