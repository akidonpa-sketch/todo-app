export default function Header({ stats, theme, onToggleTheme }) {
  return (
    <div className="header">
      <div className="header-top">
        <h1 className="header-title">
          ✅ <span className="gradient-text">TODOリスト</span>
        </h1>
        <button className="theme-btn" onClick={onToggleTheme} title="テーマ切替">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">合計</div>
        </div>
        <div className="stat">
          <div className="stat-number stat-active">{stats.active}</div>
          <div className="stat-label">未完了</div>
        </div>
        <div className="stat">
          <div className="stat-number stat-done">{stats.completed}</div>
          <div className="stat-label">完了済み</div>
        </div>
      </div>
    </div>
  )
}
