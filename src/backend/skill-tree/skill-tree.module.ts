import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillTreeService } from './skill-tree.service';
import { SkillTreeController } from './skill-tree.controller';
import { SkillTree } from './entities/skill-tree.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillTree])],
  controllers: [SkillTreeController],
  providers: [SkillTreeService],
  exports: [SkillTreeService, TypeOrmModule.forFeature([SkillTree])],
})
export class SkillTreeModule {}