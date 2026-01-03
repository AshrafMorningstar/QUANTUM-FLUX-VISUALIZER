/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import QuantumCanvas from "./components/QuantumCanvas";
import StatsPanel from "./components/StatsPanel";
import ThemeSelector from "./components/ThemeSelector";
import ParticleBackground from "./components/ParticleBackground";
import "./styles/App.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 3000);
  }, []);

  return (
    <ThemeProvider>
      <div className={`app-container ${isLoaded ? "loaded" : ""}`}>
        <ParticleBackground />
        <ThemeSelector />
        <div className="main-content">
          <header className="quantum-header">
            <h1 className="quantum-title">
              <span className="quantum-glow">QUANTUM</span>
              <span className="flux-text">FLUX</span>
            </h1>
            <p className="quantum-subtitle">
              Multi-Dimensional GitHub Analytics
            </p>
            <div className="user-badge">
              <span className="badge-icon">👤</span>
              <span className="badge-name">AshrafMorningstar</span>
            </div>
          </header>

          <div className="visualization-grid">
            <QuantumCanvas />
            <StatsPanel />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
