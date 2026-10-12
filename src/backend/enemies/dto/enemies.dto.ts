import { IsString, IsEnum, IsNumber, IsOptional, Min, Max, IsBoolean } from 'class-validator';
import { EnemyTier, EnemyType } from '../entities/enemy.entity';

export class CreateEnemyDto {
  @IsString()
  userId: string;

  @IsEnum(EnemyTier)
  @IsOptional()
  tier?: EnemyTier;

  @IsEnum(EnemyType)
  @IsOptional()
  type?: EnemyType;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  level?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  health?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxHealth?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  attack?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  defense?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  magicAttack?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  magicDefense?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  experienceValue?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  goldValue?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  soulsValue?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  drops?: number;

  @IsBoolean()
  @IsOptional()
  isBoss?: boolean;

  @IsBoolean()
  @IsOptional()
  isElite?: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  cooldown?: number;
}

export class UpdateEnemyDto {
  @IsEnum(EnemyTier)
  @IsOptional()
  tier?: EnemyTier;

  @IsEnum(EnemyType)
  @IsOptional()
  type?: EnemyType;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  level?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  health?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxHealth?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  attack?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  defense?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  magicAttack?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  magicDefense?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  experienceValue?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  goldValue?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  soulsValue?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  drops?: number;

  @IsBoolean()
  @IsOptional()
  isBoss?: boolean;

  @IsBoolean()
  @IsOptional()
  isElite?: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  cooldown?: number;
}

export class SpawnEnemyDto {
  @IsString()
  userId: string;

  @IsEnum(EnemyTier)
  tier: EnemyTier;

  @IsEnum(EnemyType)
  type: EnemyType;

  @IsNumber()
  @Min(1)
  level: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  health?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxHealth?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  attack?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  defense?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  magicAttack?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  magicDefense?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  experienceValue?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  goldValue?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  soulsValue?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  drops?: number;

  @IsBoolean()
  @IsOptional()
  isBoss?: boolean;

  @IsBoolean()
  @IsOptional()
  isElite?: boolean;
}