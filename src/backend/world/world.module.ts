import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorldService } from './world.service';
import { WorldController } from './world.controller';
import { WorldAreaEntity } from './entities/world-area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorldAreaEntity])],
  controllers: [WorldController],
  providers: [WorldService],
  exports: [WorldService, TypeOrmModule.forFeature([WorldAreaEntity])],
})
export class WorldModule {}