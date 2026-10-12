import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, HttpStatus, HttpCode, Put } from '@nestjs/common';
import { CharacterProgressionService } from './character-progression.service';
import { CreateProgressionDto, GainExperienceDto, AllocateAttributePointDto, CompleteQuestDto } from './dto/character-progression.dto';
import { CharacterProgressionResponse } from './entities/character-progression.entity';

@Controller('api/character-progression')
export class CharacterProgressionController {
  constructor(private characterProgressionService: CharacterProgressionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createProgressionDto: CreateProgressionDto): Promise<CharacterProgressionResponse> {
    return this.characterProgressionService.create(createProgressionDto.userId);
  }

  @Get('user/:userId')
  async getUserProgression(@Param('userId') userId: string): Promise<any> {
    return this.characterProgressionService.getUserProgression(userId);
  }

  @Post(':userId/experience')
  async gainExperience(
    @Param('userId') userId: string,
    @Body() gainExperienceDto: GainExperienceDto
  ): Promise<CharacterProgressionResponse | null> {
    return this.characterProgressionService.gainExperience(userId, gainExperienceDto.experience);
  }

  @Post(':userId/attribute')
  async allocateAttributePoint(
    @Param('userId') userId: string,
    @Body() allocateAttributePointDto: AllocateAttributePointDto
  ): Promise<CharacterProgressionResponse | null> {
    return this.characterProgressionService.allocateAttributePoint(
      userId, 
      allocateAttributePointDto.attribute
    );
  }

  @Post(':userId/quest')
  async completeQuest(
    @Param('userId') userId: string,
    @Body() completeQuestDto: CompleteQuestDto
  ): Promise<CharacterProgressionResponse | null> {
    return this.characterProgressionService.completeQuest(
      userId,
      completeQuestDto.souls,
      completeQuestDto.relics
    );
  }
}

export class CreateProgressionDto {
  userId: string;
}

export class GainExperienceDto {
  experience: number;
}

export class AllocateAttributePointDto {
  attribute: string;
}

export class CompleteQuestDto {
  souls?: number;
  relics?: number;
}