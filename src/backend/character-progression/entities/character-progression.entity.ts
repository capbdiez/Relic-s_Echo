import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/entities/user.entity';

export enum AttributeType {
  STRENGTH = 'strength',
  AGILITY = 'agility', 
  INTELLIGENCE = 'intelligence',
  HEALTH = 'health',
  SORCERY = 'sorcery'
}

@Entity('character_progression')
export class CharacterProgression {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'jsonb' })
  attributes: {
    [key in AttributeType]: number;
  };

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  totalExperience: number;

  @Column({ default: 0 })
  availablePoints: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  soulsCollected: number;

  @Column({ default: 0 })
  relicsFound: number;

  // Non-sensitive data methods
  toResponse() {
    return {
      id: this.id,
      userId: this.userId,
      attributes: this.attributes,
      level: this.level,
      totalExperience: this.totalExperience,
      availablePoints: this.availablePoints,
      soulsCollected: this.soulsCollected,
      relicsFound: this.relicsFound,
      createdAt: this.createdAt,
    };
  }
}

export type CharacterProgressionResponse = Omit<CharacterProgression, 'userId'> & { user?: any };