import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterProgression, CharacterProgressionResponse, AttributeType } from './entities/character-progression.entity';

@Injectable()
export class CharacterProgressionService {
  constructor(
    @InjectRepository(CharacterProgression)
    private characterProgressionRepository: Repository<CharacterProgression>,
  ) {}

  async create(userId: string): Promise<CharacterProgressionResponse> {
    const progression = this.characterProgressionRepository.create({
      userId,
      attributes: {
        [AttributeType.STRENGTH]: 10,
        [AttributeType.AGILITY]: 10,
        [AttributeType.INTELLIGENCE]: 10,
        [AttributeType.HEALTH]: 100,
        [AttributeType.SORCERY]: 10,
      },
      level: 1,
      totalExperience: 0,
      availablePoints: 0,
      soulsCollected: 0,
      relicsFound: 0,
    });

    const savedProgression = await this.characterProgressionRepository.save(progression);
    return savedProgression.toResponse();
  }

  async findOne(userId: string): Promise<CharacterProgressionResponse | null> {
    const progression = await this.characterProgressionRepository.findOne({ 
      where: { userId },
      relations: ['user']
    });
    return progression ? progression.toResponse() : null;
  }

  async update(id: string, updateData: Partial<CharacterProgression>): Promise<CharacterProgressionResponse | null> {
    const progression = await this.characterProgressionRepository.findOne({ where: { id } });
    if (!progression) {
      throw new NotFoundException(`Character progression with ID ${id} not found`);
    }

    Object.assign(progression, updateData);
    const updatedProgression = await this.characterProgressionRepository.save(progression);
    return updatedProgression.toResponse();
  }

  async gainExperience(userId: string, experience: number): Promise<CharacterProgressionResponse | null> {
    const progression = await this.characterProgressionRepository.findOne({ where: { userId } });
    if (!progression) {
      throw new NotFoundException(`Character progression for user ${userId} not found`);
    }

    progression.totalExperience += experience;
    const newLevel = Math.floor(progression.totalExperience / 1000) + 1;
    const pointsGained = (newLevel - progression.level) * 5;
    
    progression.level = newLevel;
    progression.availablePoints += pointsGained;

    const updatedProgression = await this.characterProgressionRepository.save(progression);
    return updatedProgression.toResponse();
  }

  async allocateAttributePoint(
    userId: string,
    attribute: AttributeType
  ): Promise<CharacterProgressionResponse | null> {
    const progression = await this.characterProgressionRepository.findOne({ where: { userId } });
    if (!progression) {
      throw new NotFoundException(`Character progression for user ${userId} not found`);
    }

    if (progression.availablePoints <= 0) {
      throw new Error('No available attribute points to allocate');
    }

    progression.attributes[attribute] += 1;
    progression.availablePoints -= 1;

    const updatedProgression = await this.characterProgressionRepository.save(progression);
    return updatedProgression.toResponse();
  }

  async completeQuest(
    userId: string,
    souls: number = 10,
    relics: number = 0
  ): Promise<CharacterProgressionResponse | null> {
    const progression = await this.characterProgressionRepository.findOne({ where: { userId } });
    if (!progression) {
      throw new NotFoundException(`Character progression for user ${userId} not found`);
    }

    progression.soulsCollected += souls;
    progression.relicsFound += relics;

    // Gain experience for quest completion
    const experienceGained = souls * 5 + relics * 20;
    await this.gainExperience(userId, experienceGained);

    const updatedProgression = await this.characterProgressionRepository.save(progression);
    return updatedProgression.toResponse();
  }

  async getUserProgression(userId: string): Promise<any> {
    const progression = await this.findOne(userId);
    if (!progression) {
      throw new NotFoundException(`Character progression for user ${userId} not found`);
    }

    // Return comprehensive progression data for UI
    return {
      ...progression,
      strength: progression.attributes.strength,
      agility: progression.attributes.agility,
      intelligence: progression.attributes.intelligence,
      health: progression.attributes.health,
      sorcery: progression.attributes.sorcery,
      nextLevelExperience: (progression.level * 1000) - progression.totalExperience,
    };
  }
}

export { CharacterProgressionResponse };