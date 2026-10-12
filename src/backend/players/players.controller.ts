import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto, UpdatePlayerDto, GainExperienceDto, ApplyDamageDto } from './dto/players.dto';
import { PlayerResponse } from './entities/player.entity';

@Controller('api/players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<PlayerResponse> {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  async findAll(): Promise<PlayerResponse[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PlayerResponse | null> {
    return this.playersService.findOne(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<PlayerResponse | null> {
    return this.playersService.findByUserId(userId);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string, 
    @Body() updatePlayerDto: UpdatePlayerDto
  ): Promise<PlayerResponse | null> {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.playersService.remove(id);
  }

  // Character progression endpoints
  @Post(':id/experience')
  async gainExperience(
    @Param('id') id: string,
    @Body() gainExperienceDto: GainExperienceDto
  ): Promise<PlayerResponse | null> {
    return this.playersService.gainExperience(id, gainExperienceDto.experience);
  }

  // Combat system endpoints
  @Post(':id/damage')
  async applyDamage(
    @Param('id') id: string,
    @Body() applyDamageDto: ApplyDamageDto
  ): Promise<PlayerResponse | null> {
    return this.playersService.applyDamage(id, applyDamageDto.damage);
  }
}

export class CreatePlayerDto {
  userId: string;
  archetype?: string;
  level?: number;
  experience?: number;
  health?: number;
  mana?: number;
  strength?: number;
  agility?: number;
  intelligence?: number;
  gold?: number;
  souls?: number;
}

export class UpdatePlayerDto {
  archetype?: string;
  level?: number;
  experience?: number;
  health?: number;
  mana?: number;
  strength?: number;
  agility?: number;
  intelligence?: number;
  gold?: number;
  souls?: number;
}

export class GainExperienceDto {
  experience: number;
}

export class ApplyDamageDto {
  damage: number;
}