import { Heart, Home, MessageCircle, Sparkles, UserRound } from 'lucide-react';
import './App.css';

type NavItem = {
  id: string;
  label: string;
  icon: typeof Home;
  active?: boolean;
};

const navItems: NavItem[] = [
  { id: 'home', label: '首页', icon: Home, active: true },
  { id: 'feed', label: '缘途', icon: MessageCircle },
  { id: 'match', label: '配对', icon: Heart },
  { id: 'profile', label: '我的', icon: UserRound },
];

const hobbies = [
  { emoji: '☕', label: '咖啡' },
  { emoji: '📖', label: '阅读' },
  { emoji: '🎵', label: '音乐' },
];

function App() {
  return (
    <div className="app-shell">
      <main className="journal-screen">
        <header className="title-area">
          <span className="float-deco heart">💗</span>
          <span className="float-deco star">✨</span>
          <h1 className="title-pill">恋爱札记</h1>
        </header>

        <section className="board-grid">
          <article className="note-card mint">
            <span className="paper-tape top" />
            <span className="paper-tape side" />
            <h2 className="card-head">今日推荐</h2>
            <div className="card-body">
              <div className="profile-row">
                <div className="avatar">小</div>
                <div>
                  <p className="name">小婷</p>
                  <p className="age">24岁</p>
                </div>
              </div>

              <div className="hobby-list">
                {hobbies.map((hobby) => (
                  <span key={hobby.label} className="hobby-chip" title={hobby.label}>
                    {hobby.emoji}
                  </span>
                ))}
              </div>

              <div className="action-row">
                <button type="button" className="action-btn pink">
                  <Heart size={16} />
                  接缘
                </button>
                <button type="button" className="action-btn blue">
                  <MessageCircle size={16} />
                  聊聊
                </button>
              </div>
            </div>
          </article>

          <article className="note-card sky">
            <span className="paper-tape top" />
            <span className="paper-tape corner" />
            <h2 className="card-head">我的动态</h2>
            <div className="card-body feed-body">
              <div className="feed-post">
                <div className="feed-thumb" />
                <div>
                  <p className="post-text">今天搬进了新房间，准备开始新的生活节奏。</p>
                  <p className="post-meta">刚刚更新</p>
                </div>
              </div>
              <div className="divider" />
              <p className="notify-line">
                <Sparkles size={14} />
                小明接续了你的动态
              </p>
            </div>
          </article>
        </section>
      </main>

      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button key={item.id} type="button" className={`nav-item ${item.active ? 'active' : ''}`}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
