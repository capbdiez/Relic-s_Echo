import { IsString, IsBoolean, IsNumber, IsOptional, Min, Max, IsIn } from 'class-validator';
import { WorldArea } from '../entities/world-area.entity';

export class CreateWorldAreaDto {
  @IsString()
  userId: string;

  @IsIn(Object.values(WorldArea))
  area: WorldArea;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  x?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  y?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  width?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  height?: number;

  @IsBoolean()
  @IsOptional()
  isExplored?: boolean;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  monsterDensity?: number;

  @IsBoolean()
  @IsOptional()
  hasPortal?: boolean;

  @IsString()
  @IsOptional()
  portalType?: string;

  @IsOptional()
  environmentData?: any;
}

export class UpdateWorldAreaDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  x?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  y?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  width?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  height?: number;

  @IsBoolean()
  @IsOptional()
  isExplored?: boolean;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  monsterDensity?: number;

  @IsBoolean()
  @IsOptional()
  hasPortal?: boolean;

  @IsString()
  @IsOptional()
  portalType?: string;

  @IsOptional()
  environmentData?: any;
}

export class ExploreAreaDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  experienceGained?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  resourcesFound?: number;
}