import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/entities/user.entity';

export enum WorldArea {
  FOREST_ENTRY = 'forest_entry',
  DEEP_FOREST = 'deep_forest',
  FOREST_CLEARING = 'forest_clearing',
  MOUNTAIN_PASS = 'mountain_pass',
  CAVE_ENTRANCE = 'cave_entrance',
  DUNGEON_LEVEL_1 = 'dungeon_level_1',
  DUNGEON_LEVEL_2 = 'dungeon_level_2',
  DUNGEON_BOSS_ROOM = 'dungeon_boss_room',
}

@Entity('world_areas')
export class WorldAreaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: WorldArea,
  })
  area: WorldArea;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'jsonb' })
  coordinates: { x: number; y: number; width: number; height: number };

  @Column({ default: false })
  isExplored: boolean;

  @Column({ default: false })
  isVisible: boolean;

  @Column({ default: 0 })
  monsterDensity: number;

  @Column({ default: false })
  hasPortal: boolean;

  @Column({ nullable: true })
  portalType: string;

  @Column({ type: 'jsonb', nullable: true })
  environmentData: any;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  // Non-sensitive data methods
  toResponse() {
    return {
      id: this.id,
      userId: this.userId,
      area: this.area,
      name: this.name,
      description: this.description,
      coordinates: this.coordinates,
      isExplored: this.isExplored,
      isVisible: this.isVisible,
      monsterDensity: this.monsterDensity,
      hasPortal: this.hasPortal,
      portalType: this.portalType,
      environmentData: this.environmentData,
      createdAt: this.createdAt,
    };
  }
}

export type WorldAreaResponse = Omit<WorldAreaEntity, 'userId'> & { user?: any };