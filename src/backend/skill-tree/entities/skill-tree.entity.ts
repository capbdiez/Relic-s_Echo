import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Archetype } from '../players/entities/player.entity';

export enum SkillType {
  PASSIVE = 'passive',
  ACTIVE = 'active',
  UTILITY = 'utility',
  ULTIMATE = 'ultimate',
}

export enum SkillRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

@Entity('skill_tree')
export class SkillTree {
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
  })
  archetype: Archetype;

  @Column({
    type: 'enum',
    enum: SkillType,
  })
  skillType: SkillType;

  @Column({
    type: 'enum',
    enum: SkillRarity,
    default: SkillRarity.COMMON,
  })
  rarity: SkillRarity;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  maxLevel: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: 0 })
  requiredLevel: number;

  @Column({ default: 0 })
  cost: number;

  @Column({ default: 0 })
  manaCost: number;

  @Column({ default: 0 })
  cooldown: number;

  @Column({ default: false })
  isLearned: boolean;

  @Column({ default: 0 })
  pointsSpent: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  // Non-sensitive data methods
  toResponse() {
    return {
      id: this.id,
      userId: this.userId,
      archetype: this.archetype,
      skillType: this.skillType,
      rarity: this.rarity,
      name: this.name,
      description: this.description,
      level: this.level,
      maxLevel: this.maxLevel,
      experience: this.experience,
      requiredLevel: this.requiredLevel,
      cost: this.cost,
      manaCost: this.manaCost,
      cooldown: this.cooldown,
      isLearned: this.isLearned,
      pointsSpent: this.pointsSpent,
      createdAt: this.createdAt,
    };
  }
}

export type SkillTreeResponse = Omit<SkillTree, 'userId'> & { user?: any };