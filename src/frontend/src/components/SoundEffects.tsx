import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

type SoundEffectType = 
  | 'portal_enter'
  | 'portal_special'
  | 'enemy_spawn'
  | 'enemy_defeat'
  | 'level_up'
  | 'skill_learn'
  | 'damage_taken'
  | 'healing'
  | 'coin_collect'
  | 'boss_spawn'
  | 'portal_complete';

interface SoundConfig {
  volume: number;
  playRate: number;
  loop: boolean;
}

interface SoundEffect {
  type: SoundEffectType;
  config: SoundConfig;
  audioElement: HTMLAudioElement;
}

interface SoundContextType {
  isMuted: boolean;
  volume: number;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  playSound: (type: SoundEffectType, config?: Partial<SoundConfig>) => void;
  stopSound: (type: SoundEffectType) => void;
  loadSound: (type: SoundEffectType, path: string) => Promise<void>;
  isSoundLoaded: (type: SoundEffectType) => boolean;
}

const SoundContext = createContext<SoundContextType | null>(null);

const defaultSounds: Record<SoundEffectType, string> = {
  'portal_enter': '/sounds/portal-normal.mp3',
  'portal_special': '/sounds/portal-special.mp3',
  'enemy_spawn': '/sounds/enemy-spawn.mp3',
  'enemy_defeat': '/sounds/enemy-defeat.mp3',
  'level_up': '/sounds/level-up.mp3',
  'skill_learn': '/sounds/skill-learn.mp3',
  'damage_taken': '/sounds/damage-taken.mp3',
  'healing': '/sounds/healing.mp3',
  'coin_collect': '/sounds/coin-collect.mp3',
  'boss_spawn': '/sounds/boss-spawn.mp3',
  'portal_complete': '/sounds/portal-complete.mp3',
};

const defaultConfig: SoundConfig = {
  volume: 0.7,
  playRate: 1.0,
  loop: false,
};

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [sounds, setSounds] = useState<Map<SoundEffectType, SoundEffect>>(new Map());

  // Initialize audio elements
  useEffect(() => {
    const initSounds = async () => {
      const newSounds = new Map<SoundEffectType, SoundEffect>();
      
      for (const [type, path] of Object.entries(defaultSounds)) {
        try {
          const audio = new Audio(path);
          audio.volume = volume;
          audio.preload = 'auto';
          
          const soundEffect: SoundEffect = {
            type: type as SoundEffectType,
            config: { ...defaultConfig },
            audioElement: audio,
          };
          
          newSounds.set(type as SoundEffectType, soundEffect);
        } catch (error) {
          console.warn(`Failed to load sound: ${type}`, error);
        }
      }
      
      setSounds(newSounds);
    };
    
    initSounds();
  }, []);

  // Update volume when volume changes
  useEffect(() => {
    sounds.forEach(sound => {
      sound.audioElement.volume = isMuted ? 0 : volume;
    });
  }, [volume, isMuted, sounds]);

  const playSound = (type: SoundEffectType, config: Partial<SoundConfig> = {}) => {
    const sound = sounds.get(type);
    if (!sound) {
      console.warn(`Sound not loaded: ${type}`);
      return;
    }

    // Stop any currently playing sound of this type
    sound.audioElement.pause();
    sound.audioElement.currentTime = 0;

    // Apply custom config
    const finalConfig = { ...sound.config, ...config };
    sound.audioElement.volume = isMuted ? 0 : finalConfig.volume;
    sound.audioElement.playbackRate = finalConfig.playRate;
    sound.audioElement.loop = finalConfig.loop;

    // Play the sound
    sound.audioElement.play().catch(error => {
      console.warn(`Failed to play sound: ${type}`, error);
    });
  };

  const stopSound = (type: SoundEffectType) => {
    const sound = sounds.get(type);
    if (sound) {
      sound.audioElement.pause();
      sound.audioElement.currentTime = 0;
    }
  };

  const loadSound = async (type: SoundEffectType, path: string): Promise<void> => {
    try {
      const sound = sounds.get(type);
      if (sound) {
        sound.audioElement.src = path;
        sound.audioElement.load();
        return;
      }

      const audio = new Audio(path);
      audio.volume = isMuted ? 0 : volume;
      
      const newSoundEffect: SoundEffect = {
        type,
        config: { ...defaultConfig },
        audioElement: audio,
      };
      
      setSounds(prev => new Map(prev).set(type, newSoundEffect));
    } catch (error) {
      console.error(`Failed to load sound: ${type}`, error);
      throw error;
    }
  };

  const isSoundLoaded = (type: SoundEffectType): boolean => {
    return sounds.has(type);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const contextValue: SoundContextType = {
    isMuted,
    volume,
    setVolume,
    toggleMute,
    playSound,
    stopSound,
    loadSound,
    isSoundLoaded,
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
}

interface SoundEffectsProps {
  children: React.ReactNode;
}

export function SoundEffects({ children }: SoundEffectsProps) {
  return (
    <SoundProvider>
      {children}
    </SoundProvider>
  );
}