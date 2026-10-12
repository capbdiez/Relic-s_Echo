import React from 'react';
import { useSound } from './SoundEffects';

export default function SoundToggle() {
  const { isMuted, volume, setVolume, toggleMute } = useSound();

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
      <button
        onClick={toggleMute}
        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v13m0 0l-6-6m6 6l6-6" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2z" />
          </svg>
        )}
      </button>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-400">Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24"
          disabled={isMuted}
        />
        <span className="text-sm text-gray-400 w-8">
          {Math.round(volume * 100)}%
        </span>
      </div>

      <div className="text-xs text-gray-500">
        {isMuted ? 'Sound Off' : 'Sound On'}
      </div>
    </div>
  );
}