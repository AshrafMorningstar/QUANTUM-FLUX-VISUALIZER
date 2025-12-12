import { useState, useEffect } from "react";
import "./StatsPanel.css";

interface GitHubStats {
  repos: number;
  stars: number;
  commits: number;
  followers: number;
  contributions: number;
  languages: { name: string; percentage: number }[];
}

const StatsPanel = () => {
  const [stats, setStats] = useState<GitHubStats>({
    repos: 42,
    stars: 1337,
    commits: 5280,
    followers: 256,
    contributions: 3847,
    languages: [
      { name: "TypeScript", percentage: 45 },
      { name: "JavaScript", percentage: 30 },
      { name: "Python", percentage: 15 },
      { name: "CSS", percentage: 10 },
    ],
  });

  const [animatedStats, setAnimatedStats] = useState({
    repos: 0,
    stars: 0,
    commits: 0,
    followers: 0,
    contributions: 0,
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        repos: Math.floor(stats.repos * progress),
        stars: Math.floor(stats.stars * progress),
        commits: Math.floor(stats.commits * progress),
        followers: Math.floor(stats.followers * progress),
        contributions: Math.floor(stats.contributions * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stats]);

  return (
    <div className="stats-panel">
      <div className="stats-header">
        <h2 className="stats-title">GitHub Analytics</h2>
        <div className="stats-subtitle">Real-time Quantum Metrics</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{animatedStats.repos}</div>
          <div className="stat-label">Repositories</div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{animatedStats.stars}</div>
          <div className="stat-label">Stars</div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💻</div>
          <div className="stat-value">{animatedStats.commits}</div>
          <div className="stat-label">Commits</div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{animatedStats.followers}</div>
          <div className="stat-label">Followers</div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">{animatedStats.contributions}</div>
          <div className="stat-label">Contributions</div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card achievement-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">Elite</div>
          <div className="stat-label">Developer Rank</div>
          <div className="stat-glow"></div>
        </div>
      </div>

      <div className="languages-section">
        <h3 className="section-title">Language Distribution</h3>
        <div className="languages-list">
          {stats.languages.map((lang, index) => (
            <div key={index} className="language-item">
              <div className="language-header">
                <span className="language-name">{lang.name}</span>
                <span className="language-percentage">{lang.percentage}%</span>
              </div>
              <div className="language-bar">
                <div
                  className="language-fill"
                  style={{
                    width: `${lang.percentage}%`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
