import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SoundEffects, SoundToggle } from './components/SoundEffects';
import ParticleEffects from './components/ParticleEffects';

function App() {
  return (
    <SoundEffects>
      <ParticleEffects>
        <AuthProvider>
          <GameProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </Router>
          </GameProvider>
        </AuthProvider>
      </ParticleEffects>
      {/* Sound toggle button - top right corner */}
      <div className="fixed top-4 right-4 z-50">
        <SoundToggle />
      </div>
    </SoundEffects>
  );
}

export default App;