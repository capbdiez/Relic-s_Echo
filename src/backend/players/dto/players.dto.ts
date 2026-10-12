import { IsString, IsEnum, IsInt, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Archetype } from '../entities/player.entity';

export class CreatePlayerDto {
  @IsString()
  userId: string;

  @IsEnum(Archetype)
  @IsOptional()
  archetype?: Archetype;

  @IsInt()
  @Min(1)
  @Max(999)
  @IsOptional()
  level?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  experience?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  health?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  mana?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  strength?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  agility?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  intelligence?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  gold?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  souls?: number;
}

export class UpdatePlayerDto {
  @IsEnum(Archetype)
  @IsOptional()
  archetype?: Archetype;

  @IsInt()
  @Min(1)
  @Max(999)
  @IsOptional()
  level?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  experience?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  health?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  mana?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  strength?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  agility?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  intelligence?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  gold?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  souls?: number;
}