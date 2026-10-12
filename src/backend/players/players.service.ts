import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player, PlayerResponse, Archetype } from './entities/player.entity';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/players.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<PlayerResponse> {
    const player = this.playersRepository.create(createPlayerDto);
    const savedPlayer = await this.playersRepository.save(player);
    return savedPlayer.toResponse();
  }

  async findAll(): Promise<PlayerResponse[]> {
    const players = await this.playersRepository.find();
    return players.map(player => player.toResponse());
  }

  async findOne(id: string): Promise<PlayerResponse | null> {
    const player = await this.playersRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    return player ? player.toResponse() : null;
  }

  async findByUserId(userId: string): Promise<PlayerResponse | null> {
    const player = await this.playersRepository.findOne({ 
      where: { userId },
      relations: ['user']
    });
    return player ? player.toResponse() : null;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<PlayerResponse | null> {
    const player = await this.playersRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    Object.assign(player, updatePlayerDto);
    const updatedPlayer = await this.playersRepository.save(player);
    return updatedPlayer.toResponse();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.playersRepository.delete(id);
    return result.affected > 0;
  }

  // Character progression methods
  async gainExperience(playerId: string, experience: number): Promise<PlayerResponse | null> {
    const player = await this.playersRepository.findOne({ where: { id: playerId } });
    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

    player.experience += experience;
    player.level = Math.floor(player.experience / 100) + 1;
    
    // Apply stat increases based on level
    const levelDifference = player.level - 1;
    if (levelDifference > 0) {
      player.strength += levelDifference * 2;
      player.agility += levelDifference * 1;
      player.intelligence += levelDifference * 1;
      player.health += levelDifference * 10;
      player.mana += levelDifference * 5;
    }

    const updatedPlayer = await this.playersRepository.save(player);
    return updatedPlayer.toResponse();
  }

  async createDefaultPlayer(userId: string): Promise<PlayerResponse> {
    const defaultPlayerData: CreatePlayerDto = {
      userId,
      archetype: Archetype.EXPLORER,
      level: 1,
      experience: 0,
      health: 100,
      mana: 100,
      strength: 10,
      agility: 10,
      intelligence: 10,
      gold: 0,
      souls: 0,
    };

    return this.create(defaultPlayerData);
  }

  // Combat system basics
  async calculateDamage(
    attacker: Player, 
    defender: Player, 
    weaponDamage: number = 10
  ): Promise<number> {
    const damageMultiplier = 1 + (attacker.strength - defender.agility) / 100;
    const criticalChance = attacker.agility / 200;
    let damage = weaponDamage * damageMultiplier;

    if (Math.random() < criticalChance) {
      damage *= 1.5; // Critical hit bonus
    }

    return Math.max(1, Math.floor(damage));
  }

  async applyDamage(
    playerId: string, 
    damage: number
  ): Promise<PlayerResponse | null> {
    const player = await this.playersRepository.findOne({ where: { id: playerId } });
    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

    player.health = Math.max(0, player.health - damage);
    await this.playersRepository.save(player);
    
    return player.toResponse();
  }
}

export { PlayerResponse, Archetype };