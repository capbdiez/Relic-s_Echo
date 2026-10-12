import React, { createContext, useContext } from 'react';
import { useSound } from '../components/SoundEffects';

type SoundContextType = ReturnType<typeof useSound>;

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundContextProvider({ children }: { children: React.ReactNode }) {
  const sound = useSound();
  return (
    <SoundContext.Provider value={sound}>
      {children}
    </SoundContext.Provider>
  );
}

export { useSound };