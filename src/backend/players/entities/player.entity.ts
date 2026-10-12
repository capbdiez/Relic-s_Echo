import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { ClassType, IsIn, IsInt, IsNumber, IsString, Min, Max } from 'class-validator';

export enum Archetype {
  EXPLORER = 'explorer',
  SWORDSMAN = 'swordsman',
  TANK = 'tank',
  ASSASSIN = 'assassin',
  MAGE = 'mage',
  NECROMANCER = 'necromancer'
}

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: Archetype,
    default: Archetype.EXPLORER,
  })
  @IsIn(Object.values(Archetype))
  archetype: Archetype;

  @Column({ default: 1 })
  @IsInt()
  @Min(1)
  @Max(999)
  level: number;

  @Column({ default: 0 })
  @IsNumber()
  @Min(0)
  experience: number;

  @Column({ default: 100 })
  @IsNumber()
  @Min(0)
  health: number;

  @Column({ default: 100 })
  @IsNumber()
  @Min(0)
  mana: number;

  @Column({ default: 10 })
  @IsNumber()
  @Min(0)
  strength: number;

  @Column({ default: 10 })
  @IsNumber()
  @Min(0)
  agility: number;

  @Column({ default: 10 })
  @IsNumber()
  @Min(0)
  intelligence: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  gold: number;

  @Column({ default: 0 })
  souls: number;

  // Non-sensitive data methods
  toResponse() {
    return {
      id: this.id,
      userId: this.userId,
      archetype: this.archetype,
      level: this.level,
      experience: this.experience,
      health: this.health,
      mana: this.mana,
      strength: this.strength,
      agility: this.agility,
      intelligence: this.intelligence,
      gold: this.gold,
      souls: this.souls,
      createdAt: this.createdAt,
    };
  }
}

export type PlayerResponse = Omit<Player, 'userId'> & { user?: any };