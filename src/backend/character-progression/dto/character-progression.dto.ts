import { IsString, IsNumber, IsOptional, Min, Max, IsIn } from 'class-validator';
import { AttributeType } from '../entities/character-progression.entity';

export class CreateCharacterProgressionDto {
  @IsString()
  userId: string;

  @IsIn(Object.values(AttributeType))
  strength: number;

  @IsIn(Object.values(AttributeType))
  agility: number;

  @IsIn(Object.values(AttributeType))
  intelligence: number;

  @IsIn(Object.values(AttributeType))
  health: number;

  @IsIn(Object.values(AttributeType))
  sorcery: number;

  @IsNumber()
  @Min(1)
  @Max(999)
  level: number;

  @IsNumber()
  @Min(0)
  totalExperience: number;

  @IsNumber()
  @Min(0)
  availablePoints: number;

  @IsNumber()
  @Min(0)
  soulsCollected: number;

  @IsNumber()
  @Min(0)
  relicsFound: number;
}

export class UpdateCharacterProgressionDto {
  @IsIn(Object.values(AttributeType))
  @IsOptional()
  strength?: number;

  @IsIn(Object.values(AttributeType))
  @IsOptional()
  agility?: number;

  @IsIn(Object.values(AttributeType))
  @IsOptional()
  intelligence?: number;

  @IsIn(Object.values(AttributeType))
  @IsOptional()
  health?: number;

  @IsIn(Object.values(AttributeType))
  @IsOptional()
  sorcery?: number;

  @IsNumber()
  @Min(1)
  @Max(999)
  @IsOptional()
  level?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalExperience?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  availablePoints?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  soulsCollected?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  relicsFound?: number;
}