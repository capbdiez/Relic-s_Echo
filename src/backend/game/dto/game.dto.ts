import { IsString, IsNumber, IsOptional, Min, Max, IsBoolean, IsIn } from 'class-validator';
import { PortalType } from '../entities/game-session.entity';

export class StartGameSessionDto {
  @IsString()
  userId: string;

  @IsNumber()
  @Min(0)
  score?: number;

  @IsNumber()
  @Min(0)
  timePlayed?: number;

  @IsNumber()
  @Min(0)
  enemiesDefeated?: number;

  @IsNumber()
  @Min(0)
  soulsCollected?: number;

  @IsNumber()
  @Min(0)
  relicsFound?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @Min(1)
  @Max(10)
  difficultyLevel?: number;
}

export class UpdateGameSessionDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  score?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  timePlayed?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  enemiesDefeated?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  soulsCollected?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  relicsFound?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  area?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  x?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  y?: number;

  @IsBoolean()
  @IsOptional()
  visited?: boolean;

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  difficultyLevel?: number;
}

export class EnterPortalDto {
  @IsIn(Object.values(PortalType))
  portalType: PortalType;
}