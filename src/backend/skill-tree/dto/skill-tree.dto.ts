import { IsString, IsEnum, IsNumber, IsOptional, Min, Max, IsBoolean } from 'class-validator';
import { SkillType, SkillRarity } from '../entities/skill-tree.entity';
import { Archetype } from '../players/entities/player.entity';

export class CreateSkillTreeDto {
  @IsString()
  userId: string;

  @IsEnum(Archetype)
  archetype: Archetype;

  @IsEnum(SkillType)
  skillType: SkillType;

  @IsEnum(SkillRarity)
  @IsOptional()
  rarity?: SkillRarity;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  level?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxLevel?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  experience?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  requiredLevel?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  cost?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  manaCost?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  cooldown?: number;

  @IsBoolean()
  @IsOptional()
  isLearned?: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  pointsSpent?: number;
}

export class UpdateSkillTreeDto {
  @IsEnum(SkillType)
  @IsOptional()
  skillType?: SkillType;

  @IsEnum(SkillRarity)
  @IsOptional()
  rarity?: SkillRarity;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  level?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxLevel?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  experience?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  requiredLevel?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  cost?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  manaCost?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  cooldown?: number;

  @IsBoolean()
  @IsOptional()
  isLearned?: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  pointsSpent?: number;
}

export class LearnSkillDto {
  @IsNumber()
  @Min(1)
  userLevel: number;

  @IsNumber()
  @Min(0)
  availablePoints: number;
}

export class UpgradeSkillDto {
  @IsNumber()
  @Min(1)
  userLevel: number;

  @IsNumber()
  @Min(0)
  availablePoints: number;
}