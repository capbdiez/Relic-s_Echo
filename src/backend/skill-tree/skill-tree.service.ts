import { Injectable, NotFoundException, InjectRepository } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SkillTree, SkillTreeResponse, SkillType, SkillRarity } from './entities/skill-tree.entity';
import { CreateSkillTreeDto, UpdateSkillTreeDto, LearnSkillDto, UpgradeSkillDto } from './dto/skill-tree.dto';
import { Archetype } from '../players/entities/player.entity';

@Injectable()
export class SkillTreeService {
  constructor(
    @InjectRepository(SkillTree)
    private skillTreeRepository: Repository<SkillTree>,
  ) {}

  async create(createSkillTreeDto: CreateSkillTreeDto): Promise<SkillTreeResponse> {
    const skill = this.skillTreeRepository.create(createSkillTreeDto);
    const savedSkill = await this.skillTreeRepository.save(skill);
    return savedSkill.toResponse();
  }

  async findAll(userId: string): Promise<SkillTreeResponse[]> {
    const skills = await this.skillTreeRepository.find({
      where: { userId },
    });
    return skills.map(skill => skill.toResponse());
  }

  async findOne(id: string, userId: string): Promise<SkillTreeResponse | null> {
    const skill = await this.skillTreeRepository.findOne({
      where: { id, userId },
    });
    return skill ? skill.toResponse() : null;
  }

  async findByArchetype(userId: string, archetype: Archetype): Promise<SkillTreeResponse[]> {
    const skills = await this.skillTreeRepository.find({
      where: { userId, archetype },
    });
    return skills.map(skill => skill.toResponse());
  }

  async findLearnedSkills(userId: string, archetype: Archetype): Promise<SkillTreeResponse[]> {
    const skills = await this.skillTreeRepository.find({
      where: { userId, archetype, isLearned: true },
    });
    return skills.map(skill => skill.toResponse());
  }

  async update(id: string, updateSkillTreeDto: UpdateSkillTreeDto, userId: string): Promise<SkillTreeResponse | null> {
    const skill = await this.skillTreeRepository.findOne({
      where: { id, userId },
    });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    Object.assign(skill, updateSkillTreeDto);
    const updatedSkill = await this.skillTreeRepository.save(skill);
    return updatedSkill.toResponse();
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const result = await this.skillTreeRepository.delete({ id, userId });
    return result.affected > 0;
  }

  async learnSkill(id: string, userId: string, learnSkillDto: LearnSkillDto): Promise<SkillTreeResponse | null> {
    const skill = await this.skillTreeRepository.findOne({
      where: { id, userId },
    });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    if (skill.isLearned) {
      throw new Error('This skill has already been learned');
    }

    if (skill.requiredLevel > learnSkillDto.userLevel) {
      throw new Error('User level is not high enough to learn this skill');
    }

    if (skill.cost > learnSkillDto.availablePoints) {
      throw new Error('Insufficient skill points to learn this skill');
    }

    skill.isLearned = true;
    skill.pointsSpent = skill.cost;
    const updatedSkill = await this.skillTreeRepository.save(skill);
    return updatedSkill.toResponse();
  }

  async upgradeSkill(id: string, userId: string, upgradeSkillDto: UpgradeSkillDto): Promise<SkillTreeResponse | null> {
    const skill = await this.skillTreeRepository.findOne({
      where: { id, userId },
    });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    if (!skill.isLearned) {
      throw new Error('This skill must be learned before upgrading');
    }

    if (skill.level >= skill.maxLevel) {
      throw new Error('Skill has already reached maximum level');
    }

    if (skill.cost > upgradeSkillDto.availablePoints) {
      throw new Error('Insufficient skill points to upgrade this skill');
    }

    skill.level += 1;
    skill.pointsSpent += skill.cost;
    skill.experience += 100; // Example experience gain

    const updatedSkill = await this.skillTreeRepository.save(skill);
    return updatedSkill.toResponse();
  }

  async getSkillTreeSummary(userId: string, archetype: Archetype): Promise<any> {
    const skills = await this.findByArchetype(userId, archetype);
    const learnedSkills = skills.filter(skill => skill.isLearned);
    
    const totalSkillPoints = learnedSkills.reduce((sum, skill) => sum + skill.pointsSpent, 0);
    const availableSkills = skills.filter(skill => !skill.isLearned && skill.requiredLevel <= 10); // Example: level 10 requirement

    return {
      totalSkills: skills.length,
      learnedSkills: learnedSkills.length,
      totalSkillPoints,
      availableSkills: availableSkills.length,
      skillsByType: {
        passive: skills.filter(skill => skill.skillType === SkillType.PASSIVE).length,
        active: skills.filter(skill => skill.skillType === SkillType.ACTIVE).length,
        utility: skills.filter(skill => skill.skillType === SkillType.UTILITY).length,
        ultimate: skills.filter(skill => skill.skillType === SkillType.ULTIMATE).length,
      },
      rarities: {
        common: skills.filter(skill => skill.rarity === SkillRarity.COMMON).length,
        uncommon: skills.filter(skill => skill.rarity === SkillRarity.UNCOMMON).length,
        rare: skills.filter(skill => skill.rarity === SkillRarity.RARE).length,
        epic: skills.filter(skill => skill.rarity === SkillRarity.EPIC).length,
        legendary: skills.filter(skill => skill.rarity === SkillRarity.LEGENDARY).length,
      },
    };
  }
}

export { SkillTreeResponse, SkillType, SkillRarity };