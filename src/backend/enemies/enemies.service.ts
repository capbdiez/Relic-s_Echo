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

  async findByType(userId: string, type: EnemyType): Promise<EnemyResponse[]> {
    const enemies = await this.enemiesRepository.find({
      where: { userId, type },
    });
    return enemies.map(enemy => enemy.toResponse());
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

  async getRandomEnemy(userId: string, level: number): Promise<EnemyResponse | null> {
    const availableTiers = [EnemyTier.CLASS_C, EnemyTier.CLASS_B];
    const randomTier = availableTiers[Math.floor(Math.random() * availableTiers.length)];
    
    const enemies = await this.enemiesRepository.find({
      where: { userId, tier: randomTier, level },
    });
    
    if (enemies.length === 0) {
      // Create a new random enemy
      const enemyTypes = Object.values(EnemyType);
      const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      
      const spawnDto = {
        userId,
        tier: randomTier,
        type: randomType,
        level,
      };
      
      return this.spawnEnemy(spawnDto);
    }
    
    // Return a random existing enemy
    const randomIndex = Math.floor(Math.random() * enemies.length);
    return enemies[randomIndex].toResponse();
  }

  async getEnemyByTier(tier: EnemyTier, level: number, userId: string): Promise<EnemyResponse | null> {
    const enemies = await this.enemiesRepository.find({
      where: { userId, tier, level },
    });
    
    if (enemies.length === 0) {
      // Create a new enemy for this tier and level
      const enemyTypes = Object.values(EnemyType);
      const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      
      const spawnDto = {
        userId,
        tier,
        type: randomType,
        level,
      };
      
      return this.spawnEnemy(spawnDto);
    }
    
    // Return a random existing enemy of this tier
    const randomIndex = Math.floor(Math.random() * enemies.length);
    return enemies[randomIndex].toResponse();
  }

  async spawnFinalBoss(userId: string, bossTier: EnemyTier = EnemyTier.CLASS_SS): Promise<EnemyResponse> {
    const spawnDto = {
      userId,
      tier: bossTier,
      type: EnemyType.BOSS,
      level: 50, // Final bosses are typically level 50
      isBoss: true,
      isElite: true,
      health: 500, // High health for bosses
      maxHealth: 500,
      attack: 25, // High attack for bosses
      defense: 20, // High defense for bosses
      magicAttack: 15,
      magicDefense: 15,
      experienceValue: 1000, // High experience for bosses
      goldValue: 500, // High gold for bosses
      soulsValue: 100, // Souls for bosses
      drops: 100, // Guaranteed drops for bosses
    };
    
    return this.spawnEnemy(spawnDto);
  }

  // Helper methods for enemy generation
  private generateEnemyName(type: EnemyType): string {
    const names = {
      [EnemyType.SLIME]: 'Slime',
      [EnemyType.GOBLIN]: 'Goblin',
      [EnemyType.ORC]: 'Orc',
      [EnemyType.WOLF]: 'Wolf',
      [EnemyType.SKELETON]: 'Skeleton',
      [EnemyType.ZOMBIE]: 'Zombie',
      [EnemyType.GOLEM]: 'Golem',
      [EnemyType.DRAGON]: 'Dragon',
    };
    return names[type] || 'Enemy';
  }

  private getEnemyDescription(type: EnemyType, tier: EnemyTier): string {
    const descriptions = {
      [EnemyType.SLIME]: {
        [EnemyTier.CLASS_C]: 'A weak slime creature.',
        [EnemyTier.CLASS_B]: 'A more powerful slime with enhanced abilities.',
        [EnemyTier.CLASS_A]: 'A dangerous slime with poisonous venom.',
        [EnemyTier.CLASS_SS]: 'A legendary slime with ancient powers.',
      },
      [EnemyType.GOBLIN]: {
        [EnemyTier.CLASS_C]: 'A mischievous goblin.',
        [EnemyTier.CLASS_B]: 'A skilled goblin archer.',
        [EnemyTier.CLASS_A]: 'A goblin shaman with magic.',
        [EnemyTier.CLASS_SS]: 'A goblin warlord with a deadly secret.',
      },
      [EnemyType.ORC]: {
        [EnemyTier.CLASS_C]: 'A weak orc warrior.',
        [EnemyTier.CLASS_B]: 'A strong orc berserker.',
        [EnemyTier.CLASS_A]: 'An orc champion with special abilities.',
        [EnemyTier.CLASS_SS]: 'A legendary orc war chief.',
      },
      [EnemyType.WOLF]: {
        [EnemyTier.CLASS_C]: 'A common wolf.',
        [EnemyTier.CLASS_B]: 'A larger wolf with hunting instincts.',
        [EnemyTier.CLASS_A]: 'A wolf pack leader.',
        [EnemyTier.CLASS_SS]: 'A legendary white wolf.',
      },
      [EnemyType.SKELETON]: {
        [EnemyTier.CLASS_C]: 'A weak skeleton.',
        [EnemyTier.CLASS_B]: 'A skeleton warrior.',
        [EnemyTier.CLASS_A]: 'A bone knight.',
        [EnemyTier.CLASS_SS]: 'An ancient skeletal guardian.',
      },
      [EnemyType.ZOMBIE]: {
        [EnemyTier.CLASS_C]: 'A slow zombie.',
        [EnemyTier.CLASS_B]: 'A faster zombie with enhanced senses.',
        [EnemyTier.CLASS_A]: 'A zombie with explosive abilities.',
        [EnemyTier.CLASS_SS]: 'A zombie horde leader.',
      },
      [EnemyType.GOLEM]: {
        [EnemyTier.CLASS_C]: 'A weak stone golem.',
        [EnemyTier.CLASS_B]: 'A stronger iron golem.',
        [EnemyTier.CLASS_A]: ' A crystallized golem.',
        [EnemyTier.CLASS_SS]: ' A legendary crystal golem.',
      },
      [EnemyType.DRAGON]: {
        [EnemyTier.CLASS_C]: 'A young dragon.',
        [EnemyTier.CLASS_B]: 'A adult dragon.',
        [EnemyTier.CLASS_A]: ' A dragon guardian.',
        [EnemyTier.CLASS_SS]: ' A legendary ancient dragon.',
      },
    };
    return descriptions[type]?.[tier] || 'A mysterious enemy.';
  }

  private getExperienceValue(tier: EnemyTier, level: number): number {
    const baseValues = {
      [EnemyTier.CLASS_C]: 10,
      [EnemyTier.CLASS_B]: 25,
      [EnemyTier.CLASS_A]: 50,
      [EnemyTier.CLASS_SS]: 100,
    };
    return Math.floor(baseValues[tier] * (level / 1));
  }

  private getGoldValue(tier: EnemyTier, level: number): number {
    const baseValues = {
      [EnemyTier.CLASS_C]: 5,
      [EnemyTier.CLASS_B]: 15,
      [EnemyTier.CLASS_A]: 30,
      [EnemyTier.CLASS_SS]: 75,
    };
    return Math.floor(baseValues[tier] * (level / 1));
  }

  private getSoulsValue(tier: EnemyTier, level: number): number {
    const baseValues = {
      [EnemyTier.CLASS_C]: 0,
      [EnemyTier.CLASS_B]: 5,
      [EnemyTier.CLASS_A]: 15,
      [EnemyTier.CLASS_SS]: 50,
    };
    return Math.floor(baseValues[tier] * (level / 1));
  }

  private getDropChance(tier: EnemyTier): number {
    const dropChances = {
      [EnemyTier.CLASS_C]: 20,
      [EnemyTier.CLASS_B]: 40,
      [EnemyTier.CLASS_A]: 60,
      [EnemyTier.CLASS_SS]: 90,
    };
    return dropChances[tier];
  }
}

export { EnemyResponse, EnemyTier, EnemyType };