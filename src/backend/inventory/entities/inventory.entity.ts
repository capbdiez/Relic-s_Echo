import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/entities/user.entity';

export enum ItemType {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  CONSUMABLE = 'consumable',
  RELIC = 'relic',
  SOUL = 'soul',
  GEM = 'gem',
}

export enum Rarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: ItemType,
  })
  itemType: ItemType;

  @Column({
    type: 'enum',
    enum: Rarity,
    default: Rarity.COMMON,
  })
  rarity: Rarity;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 0 })
  value: number;

  @Column({ default: 0 })
  power: number;

  @Column({ default: 0 })
  defense: number;

  @Column({ default: 0 })
  magicPower: number;

  @Column({ default: false })
  isEquipped: boolean;

  @Column({ default: false })
  isUsable: boolean;

  @Column({ default: 0 })
  durability: number;

  @Column({ default: 0 })
  maxDurability: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  // Non-sensitive data methods
  toResponse() {
    return {
      id: this.id,
      userId: this.userId,
      itemType: this.itemType,
      rarity: this.rarity,
      name: this.name,
      description: this.description,
      quantity: this.quantity,
      value: this.value,
      power: this.power,
      defense: this.defense,
      magicPower: this.magicPower,
      isEquipped: this.isEquipped,
      isUsable: this.isUsable,
      durability: this.durability,
      maxDurability: this.maxDurability,
      createdAt: this.createdAt,
    };
  }
}

export type InventoryResponse = Omit<Inventory, 'userId'> & { user?: any };