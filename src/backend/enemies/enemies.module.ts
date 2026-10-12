import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnemiesService } from './enemies.service';
import { EnemiesController } from './enemies.controller';
import { Enemy } from './entities/enemy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enemy])],
  controllers: [EnemiesController],
  providers: [EnemiesService],
  exports: [EnemiesService, TypeOrmModule.forFeature([Enemy])],
})
export class EnemiesModule {}