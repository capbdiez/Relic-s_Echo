import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/entities/user.entity';

export enum PortalType {
  BLUE = 'blue',
  RED = 'red'
}

@Entity('game_sessions')
export class GameSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 0 })
  timePlayed: number; // in seconds

  @Column({ default: 0 })
  enemiesDefeated: number;

  @Column({ default: 0 })
  soulsCollected: number;

  @Column({ default: 0 })
  relicsFound: number;

  @Column({ type: 'jsonb' })
  currentLocation: {
    area: string;
    coordinates: { x: number; y: number; };
    visited: boolean;
  };

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  lastUpdated: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @Column({ type: 'enum', enum: PortalType, nullable: true })
  finalPortal: PortalType;

  @Column({ default: 1 })
  difficultyLevel: number;

  // Non-sensitive data methods
  toResponse() {
    return {
      id: this.id,
      userId: this.userId,
      score: this.score,
      timePlayed: this.timePlayed,
      enemiesDefeated: this.enemiesDefeated,
      soulsCollected: this.soulsCollected,
      relicsFound: this.relicsFound,
      currentLocation: this.currentLocation,
      isActive: this.isActive,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
      difficultyLevel: this.difficultyLevel,
    };
  }
}

export type GameSessionResponse = Omit<GameSession, 'userId'> & { user?: any };