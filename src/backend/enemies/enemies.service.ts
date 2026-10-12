import { Injectable, NotFoundException, InjectRepository } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Enemy, EnemyResponse, EnemyTier, EnemyType } from './entities/enemy.entity';
import { CreateEnemyDto, UpdateEnemyDto, SpawnEnemyDto } from './dto/enemies.dto';

@Injectable()
export class EnemiesService {
  constructor(
    @InjectRepository(Enemy)
    private enemiesRepository: Repository<Enemy>,
  ) {}

  async create(createEnemyDto: CreateEnemyDto): Promise<EnemyResponse> {
    const enemy = this.enemiesRepository.create(createEnemyDto);
    const savedEnemy = await this.enemiesRepository.save(enemy);
    return savedEnemy.toResponse();
  }

  async findAll(userId: string): Promise<EnemyResponse[]> {
    const enemies = await this.enemiesRepository.find({
      where: { userId },
    });
    return enemies.map(enemy => enemy.toResponse());
  }

  async findOne(id: string, userId: string): Promise<EnemyResponse | null> {
    const enemy = await this.enemiesRepository.findOne({
      where: { id, userId },
    });
    return enemy ? enemy.toResponse() : null;
  }

  async findByTier(userId: string, tier: EnemyTier): Promise<EnemyResponse[]> {
    const enemies = await this.enemiesRepository.find({
      where: { userId, tier },
    });
    return enemies.map(enemy => enemy.toResponse());
  }

  async update(id: string, updateEnemyDto: UpdateEnemyDto, userId: string): Promise<EnemyResponse | null> {
    const enemy = await this.enemiesRepository.findOne({
      where: { id, userId },
    });
    if (!enemy) {
      throw new NotFoundException(`Enemy with ID ${id} not found`);
    }

    Object.assign(enemy, updateEnemyDto);
    const updatedEnemy = await this.enemiesRepository.save(enemy);
    return updatedEnemy.toResponse();
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const result = await this.enemiesRepository.delete({ id, userId });
    return result.affected > 0;
  }

  async spawnEnemy(spawnEnemyDto: SpawnEnemyDto): Promise<EnemyResponse> {
    const enemy = this.enemiesRepository.create({
      userId: spawnEnemyDto.userId,
      tier: spawnEnemyDto.tier,
      type: spawnEnemyDto.type,
      name: this.generateEnemyName(spawnEnemyDto.type),
      description: this.getEnemyDescription(spawnEnemyDto.type, spawnEnemyDto.tier),
      level: spawnEnemyDto.level,
      health: spawnEnemyDto.health,
      maxHealth: spawnEnemyDto.maxHealth,
      attack: spawnEnemyDto.attack,
      defense: spawnEnemyDto.defense,
      magicAttack: spawnEnemyDto.magicAttack || 0,
      magicDefense: spawnEnemyDto.magicDefense || 0,
      experienceValue: spawnEnemyDto.experienceValue || this.getExperienceValue(spawnEnemyDto.tier, spawnEnemyDto.level),
      goldValue: spawnEnemyDto.goldValue || this.getGoldValue(spawnEnemyDto.tier, spawnEnemyDto.level),
      soulsValue: spawnEnemyDto.soulsValue || this.getSoulsValue(spawnEnemyDto.tier, spawnEnemyDto.level),
      drops: spawnEnemyDto.drops || this.getDropChance(spawnEnemyDto.tier),
      isBoss: spawnEnemyDto.isBoss || spawnEnemyDto.tier === EnemyTier.CLASS_SS,
      isElite: spawnEnemyDto.isElite || spawnEnemyDto.tier === EnemyTier.CLASS_A || spawnEnemyDto.tier === EnemyTier.CLASS_SS,
      cooldown: 30,
    });

    const savedEnemy = await this.enemiesRepository.save(enemy);
    return savedEnemy.toResponse();
  }
}

export { EnemyResponse, EnemyTier, EnemyType };