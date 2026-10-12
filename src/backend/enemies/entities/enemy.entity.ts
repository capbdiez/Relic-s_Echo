import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/entities/user.entity';

export enum EnemyTier {
  CLASS_C = 'class_c',
  CLASS_B = 'class_b',
  CLASS_A = 'class_a',
  CLASS_SS = 'class_ss',
}

export enum EnemyType {
  SLIME = 'slime',
  GOBLIN = 'goblin',
  ORC = 'orc',
  WOLF = 'wolf',
  SKELETON = 'skeleton',
  ZOMBIE = 'zombie',
  GOLEM = 'golem',
  DRAGON = 'dragon',
}

@Entity('enemies')
export class Enemy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: EnemyTier,
    default: EnemyTier.CLASS_C,
  })
  tier: EnemyTier;

  @Column({
    type: 'enum',
    enum: EnemyType,
    default: EnemyType.SLIME,
  })
  type: EnemyType;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 100 })
  health: number;

  @Column({ default: 100 })
  maxHealth: number;

  @Column({ default: 5 })
  attack: number;

  @Column({ default: 5 })
  defense: number;

  @Column({ default: 0 })
  magicAttack: number;

  @Column({ default: 0 })
  magicDefense: number;

  @Column({ default: 10 })
  experienceValue: number;

  @Column({ default: 5 })
  goldValue: number;

  @Column({ default: 0 })
  soulsValue: number;

  @Column({ default: 0 })
  drops: number;

  @Column({ default: false })
  isBoss: boolean;

  @Column({ default: false })
  isElite: boolean;

  @Column({ default: 0 })
  cooldown: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  // Non-sensitive data methods
  toResponse() {
    return {
      id: this.id,
      userId: this.userId,
      tier: this.tier,
      type: this.type,
      name: this.name,
      description: this.description,
      level: this.level,
      health: this.health,
      maxHealth: this.maxHealth,
      attack: this.attack,
      defense: this.defense,
      magicAttack: this.magicAttack,
      magicDefense: this.magicDefense,
      experienceValue: this.experienceValue,
      goldValue: this.goldValue,
      soulsValue: this.soulsValue,
      drops: this.drops,
      isBoss: this.isBoss,
      isElite: this.isElite,
      cooldown: this.cooldown,
      createdAt: this.createdAt,
    };
  }
}

export type EnemyResponse = Omit<Enemy, 'userId'> & { user?: any };