import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { SkillTreeService } from './skill-tree.service';
import { CreateSkillTreeDto, UpdateSkillTreeDto, LearnSkillDto, UpgradeSkillDto } from './dto/skill-tree.dto';
import { SkillType, SkillRarity } from './entities/skill-tree.entity';
import { Archetype } from '../players/entities/player.entity';

@Controller('api/skill-tree')
export class SkillTreeController {
  constructor(private readonly skillTreeService: SkillTreeService) {}

  @Post()
  create(@Body() createSkillTreeDto: CreateSkillTreeDto) {
    return this.skillTreeService.create(createSkillTreeDto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.skillTreeService.findAll(userId);
  }

  @Get(':id/user/:userId')
  findOne(@Param('id') id: string, @Param('userId') userId: string) {
    return this.skillTreeService.findOne(id, userId);
  }

  @Get('user/:userId/archetype/:archetype')
  findByArchetype(@Param('userId') userId: string, @Param('archetype') archetype: Archetype) {
    return this.skillTreeService.findByArchetype(userId, archetype);
  }

  @Get('user/:userId/archetype/:archetype/learned')
  findLearnedSkills(@Param('userId') userId: string, @Param('archetype') archetype: Archetype) {
    return this.skillTreeService.findLearnedSkills(userId, archetype);
  }

  @Put(':id/user/:userId')
  update(@Param('id') id: string, @Body() updateSkillTreeDto: UpdateSkillTreeDto, @Param('userId') userId: string) {
    return this.skillTreeService.update(id, updateSkillTreeDto, userId);
  }

  @Delete(':id/user/:userId')
  remove(@Param('id') id: string, @Param('userId') userId: string) {
    return this.skillTreeService.remove(id, userId);
  }

  @Post(':id/learn/user/:userId')
  learnSkill(
    @Param('id') id: string, 
    @Body() learnSkillDto: LearnSkillDto, 
    @Param('userId') userId: string
  ) {
    return this.skillTreeService.learnSkill(id, userId, learnSkillDto);
  }

  @Post(':id/upgrade/user/:userId')
  upgradeSkill(
    @Param('id') id: string, 
    @Body() upgradeSkillDto: UpgradeSkillDto, 
    @Param('userId') userId: string
  ) {
    return this.skillTreeService.upgradeSkill(id, userId, upgradeSkillDto);
  }

  @Get('user/:userId/archetype/:archetype/summary')
  getSkillTreeSummary(@Param('userId') userId: string, @Param('archetype') archetype: Archetype) {
    return this.skillTreeService.getSkillTreeSummary(userId, archetype);
  }

  @Post('initialize/user/:userId/archetype/:archetype')
  initializeArchetypeSkills(
    @Param('userId') userId: string, 
    @Param('archetype') archetype: Archetype
  ) {
    return this.skillTreeService.initializeArchetypeSkills(userId, archetype);
  }
}