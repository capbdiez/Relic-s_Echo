import { UserResponse } from '../auth/entities/user.entity';
import { PlayerResponse } from '../players/entities/player.entity';
import { CharacterProgressionResponse } from '../character-progression/entities/character-progression.entity';
import { GameSessionResponse } from '../game/entities/game-session.entity';

export interface LoginResponse {
  user: UserResponse;
  accessToken: string;
}

export interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface GameMetrics {
  userId: string;
  totalGames: number;
  totalEnemiesDefeated: number;
  totalSoulsCollected: number;
  averageScore: number;
  currentLevel: number;
  currentArchetype: string;
}

export type WebSocketEventTypes = 
  | 'game_update'
  | 'player_update'  
  | 'combat_event'
  | 'portal_event'
  | 'quest_complete';

export interface WebSocketMessage {
  type: WebSocketEventTypes;
  data: any;
  timestamp: Date;
}

export interface CombatEvent {
  attackerId: string;
  defenderId: string;
  damage: number;
  criticalHit: boolean;
  attackType: string;
  timestamp: Date;
}

export interface PortalEvent {
  sessionId: string;
  portalType: 'blue' | 'red';
  outcome: 'success' | 'failure';
  reward: any;
  timestamp: Date;
}

export interface QuestEvent {
  sessionId: string;
  questId: string;
  questType: 'hunt' | 'explore' | 'deliver' | 'defend';
  completed: boolean;
  rewards: any;
  timestamp: Date;
}