import { IsString, IsEnum, IsNumber, IsOptional, Min, Max, IsBoolean } from 'class-validator';
import { ItemType, Rarity } from '../entities/inventory.entity';

export class CreateInventoryDto {
  @IsString()
  userId: string;

  @IsEnum(ItemType)
  itemType: ItemType;

  @IsEnum(Rarity)
  @IsOptional()
  rarity?: Rarity;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  @Max(999)
  quantity: number;

  @IsNumber()
  @Min(0)
  value: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  power: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  defense: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  magicPower: number;

  @IsBoolean()
  @IsOptional()
  isEquipped?: boolean;

  @IsBoolean()
  @IsOptional()
  isUsable?: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  durability?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxDurability?: number;
}

export class UpdateInventoryDto {
  @IsEnum(ItemType)
  @IsOptional()
  itemType?: ItemType;

  @IsEnum(Rarity)
  @IsOptional()
  rarity?: Rarity;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  @Max(999)
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  value?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  power?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  defense?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  magicPower?: number;

  @IsBoolean()
  @IsOptional()
  isEquipped?: boolean;

  @IsBoolean()
  @IsOptional()
  isUsable?: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  durability?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxDurability?: number;
}

export class UseItemDto {
  @IsBoolean()
  @IsOptional()
  consume?: boolean;
}

export class AddLootDto {
  @IsString()
  userId: string;

  @IsString()
  itemType: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;
}