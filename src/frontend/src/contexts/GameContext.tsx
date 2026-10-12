import React, { createContext, useContext, useReducer } from 'react';
import { GameSessionResponse } from '../shared/types';

interface GameState {
  currentSession: GameSessionResponse | null;
  isLoading: boolean;
async function fetchGameStats(userId: string, token: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/api/game/stats/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch game stats');
  }

  return response.json();
}

async function createSession(userId: string, token: string): Promise<GameSessionResponse> {
  const response = await fetch('http://localhost:3000/api/game/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create game session');
  }

  return response.json();
}

async function enterPortal(sessionId: string, portalType: string, token: string): Promise<GameSessionResponse> {
  const response = await fetch(`http://localhost:3000/api/game/session/${sessionId}/portal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ portalType }),
  });

  if (!response.ok) {
    throw new Error('Failed to enter portal');
  }

  return response.json();
}

async function completeGame(sessionId: string, token: string): Promise<GameSessionResponse> {
  const response = await fetch(`http://localhost:3000/api/game/session/${sessionId}/complete`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to complete game');
  }

  return response.json();
}

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const startGame = async (params: StartGameParams) => {
    setLoading(true);
    setError(null);
    
    try {
      throw new Error('Use startGameWithAuth instead');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to start game');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const startGameWithAuth = async (params: StartGameParams, token: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const session = await createSession(params.userId, token);
      dispatch({ type: 'SET_CURRENT_SESSION', payload: session });
      return session;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to start game');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const enterPortalWithAuth = async (sessionId: string, portalType: string, token: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedSession = await enterPortal(sessionId, portalType, token);
      dispatch({ type: 'UPDATE_SESSION', payload: updatedSession });
      return updatedSession;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to enter portal');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const completeCurrentGame = async (token: string) => {
    if (!state.currentSession) {
      throw new Error('No active game session');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const completedSession = await completeGame(state.currentSession.id, token);
      dispatch({ type: 'UPDATE_SESSION', payload: completedSession });
      return completedSession;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to complete game');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadGameStats = async (userId: string, token: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const stats = await fetchGameStats(userId, token);
      dispatch({ type: 'SET_GAME_STATS', payload: stats });
      return stats;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load game stats');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return {
    ...state,
    startGame,
    startGameWithAuth,
    enterPortalWithAuth,
    completeCurrentGame,
    loadGameStats,
    resetGame,
  };
}

export const GameContext = createContext<ReturnType<typeof useGame> | null>(null);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const game = useGame();
  return (
    <GameContext.Provider value={game}>
      {children}
    </GameContext.Provider>
  );
}
  error: string | null;
  gameStats: any;
}

interface StartGameParams {
  userId: string;
}

interface GameAction {
  type: string;
  payload?: any;
}

const initialState: GameState = {
  currentSession: null,
  isLoading: false,
  error: null,
  gameStats: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_CURRENT_SESSION':
      return {
        ...state,
        currentSession: action.payload,
      };
    case 'UPDATE_SESSION':
      return {
        ...state,
        currentSession: state.currentSession
          ? { ...state.currentSession, ...action.payload }
          : null,
      };
    case 'SET_GAME_STATS':
      return {
        ...state,
        gameStats: action.payload,
      };
    case 'RESET_GAME':
      return {
        ...state,
        currentSession: null,
        error: null,
      };
    default:
      return state;
  }
}