import { Module } from '@nestjs/common';
import { CharacterProgressionController } from './character-progression.controller';
import { CharacterProgressionService } from './character-progression.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterProgression } from './entities/character-progression.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterProgression])],
  controllers: [CharacterProgressionController],
  providers: [CharacterProgressionService],
  exports: [CharacterProgressionService],
})
export class CharacterProgressionModule {}