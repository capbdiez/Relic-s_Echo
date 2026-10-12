import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameSession, GameSessionResponse, PortalType } from './entities/game-session.entity';
import { Player } from '../players/entities/player.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameSession)
    private gameSessionRepository: Repository<GameSession>,
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async startNewGame(userId: string): Promise<GameSessionResponse> {
    const gameSession = this.gameSessionRepository.create({
      userId,
      score: 0,
      timePlayed: 0,
      enemiesDefeated: 0,
      soulsCollected: 0,
      relicsFound: 0,
      currentLocation: {
        area: 'forest_entry',
        coordinates: { x: 0, y: 0 },
        visited: false,
      },
      isActive: true,
      difficultyLevel: 1,
    });

    const savedSession = await this.gameSessionRepository.save(gameSession);
    return savedSession.toResponse();
  }

  async findActiveSession(userId: string): Promise<GameSessionResponse | null> {
    const session = await this.gameSessionRepository.findOne({
      where: { 
        userId,
        isActive: true
      },
      relations: ['user']
    });
    return session ? session.toResponse() : null;
  }

  async updateSession(sessionId: string, updates: Partial<GameSession>): Promise<GameSessionResponse | null> {
    const session = await this.gameSessionRepository.findOne({ where: { id: sessionId } });
    if (!session) {
      throw new NotFoundException(`Game session with ID ${sessionId} not found`);
    }

    Object.assign(session, updates);
    const updatedSession = await this.gameSessionRepository.save(session);
    return updatedSession.toResponse();
  }

  async enterPortal(
    sessionId: string,
    portalType: PortalType
  ): Promise<GameSessionResponse | null> {
    const session = await this.gameSessionRepository.findOne({ where: { id: sessionId } });
    if (!session) {
      throw new NotFoundException(`Game session with ID ${sessionId} not found`);
    }

    if (portalType === PortalType.RED) {
      // Red portal - high risk, high reward
      const randomEncounter = Math.random() > 0.7; // 30% chance of special encounter
      if (randomEncounter) {
        // Special boss encounter
        session.enemiesDefeated += 1;
        session.score += 1000;
        session.soulsCollected += 50;
      } else {
        // Regular encounter
        session.enemiesDefeated += 1;
        session.score += 100;
        session.soulsCollected += 10;
      }
    } else {
      // Blue portal - moderate risk, moderate reward
      session.enemiesDefeated += 1;
      session.score += 500;
      session.soulsCollected += 25;
    }

    session.finalPortal = portalType;
    session.difficultyLevel = Math.min(session.difficultyLevel + 1, 10);

    const updatedSession = await this.gameSessionRepository.save(session);
    return updatedSession.toResponse();
  }

  async findOrCreateSession(userId: string): Promise<GameSessionResponse> {
    let session = await this.findActiveSession(userId);
    
    if (!session) {
      session = await this.startNewGame(userId);
    }
    
    return session;
  }

  async completeGame(sessionId: string): Promise<GameSessionResponse | null> {
    const session = await this.gameSessionRepository.findOne({ where: { id: sessionId } });
    if (!session) {
      throw new NotFoundException(`Game session with ID ${sessionId} not found`);
    }

    session.isActive = false;
    session.endedAt = new Date();

    // Update player based on game results
    const player = await this.playersRepository.findOne({ where: { id: session.userId } });
    if (player) {
      // Increase player experience based on game performance
      const experienceGained = session.enemiesDefeated * 10 + session.soulsCollected * 5;
      player.experience += experienceGained;
      player.level = Math.floor(player.experience / 100) + 1;

      // Add gold and souls to player
      player.gold += session.soulsCollected * 2;
      player.souls += session.soulsCollected;

      await this.playersRepository.save(player);
    }

    const completedSession = await this.gameSessionRepository.save(session);
    return completedSession.toResponse();
  }

  async getGameStats(userId: string): Promise<any> {
    const activeSession = await this.findActiveSession(userId);
    const sessions = await this.gameSessionRepository.find({
      where: { userId },
      order: { startedAt: 'DESC' },
      take: 5,
    });

    return {
      activeSession,
      recentSessions: sessions.map(session => session.toResponse()),
      totalGames: sessions.length,
      totalEnemiesDefeated: sessions.reduce((sum, session) => sum + session.enemiesDefeated, 0),
      totalSoulsCollected: sessions.reduce((sum, session) => sum + session.soulsCollected, 0),
      averageScore: sessions.length > 0 
        ? sessions.reduce((sum, session) => sum + session.score, 0) / sessions.length 
        : 0,
    };
  }
}

export { GameSessionResponse };