import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EnemiesService } from './enemies.service';
import { CreateEnemyDto, UpdateEnemyDto, SpawnEnemyDto } from './dto/enemies.dto';
import { EnemyTier, EnemyType } from './entities/enemy.entity';

@Controller('api/enemies')
export class EnemiesController {
  constructor(private readonly enemiesService: EnemiesService) {}

  @Post()
  create(@Body() createEnemyDto: CreateEnemyDto) {
    return this.enemiesService.create(createEnemyDto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.enemiesService.findAll(userId);
  }

  @Get(':id/user/:userId')
  findOne(@Param('id') id: string, @Param('userId') userId: string) {
    return this.enemiesService.findOne(id, userId);
  }

  @Get('user/:userId/tier/:tier')
  findByTier(@Param('userId') userId: string, @Param('tier') tier: EnemyTier) {
    return this.enemiesService.findByTier(userId, tier);
  }

  @Get('user/:userId/type/:type')
  findByType(@Param('userId') userId: string, @Param('type') type: EnemyType) {
    return this.enemiesService.findByType(userId, type);
  }

  @Put(':id/user/:userId')
  update(@Param('id') id: string, @Body() updateEnemyDto: UpdateEnemyDto, @Param('userId') userId: string) {
    return this.enemiesService.update(id, updateEnemyDto, userId);
  }

  @Delete(':id/user/:userId')
  remove(@Param('id') id: string, @Param('userId') userId: string) {
    return this.enemiesService.remove(id, userId);
  }

  @Post('spawn')
  spawnEnemy(@Body() spawnEnemyDto: SpawnEnemyDto) {
    return this.enemiesService.spawnEnemy(spawnEnemyDto);
  }

  @Get('user/:userId/random/level/:level')
  getRandomEnemy(@Param('userId') userId: string, @Param('level') level: number) {
    return this.enemiesService.getRandomEnemy(userId, parseInt(level));
  }

  @Get('user/:userId/tier/:tier/level/:level')
  getEnemyByTier(
    @Param('userId') userId: string, 
    @Param('tier') tier: EnemyTier, 
    @Param('level') level: number
  ) {
    return this.enemiesService.getEnemyByTier(tier, parseInt(level), userId);
  }
}