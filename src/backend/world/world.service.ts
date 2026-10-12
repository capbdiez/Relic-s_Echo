import { Injectable, NotFoundException, InjectRepository } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WorldAreaEntity, WorldAreaResponse, WorldArea } from './entities/world-area.entity';
import { CreateWorldAreaDto, UpdateWorldAreaDto, ExploreAreaDto } from './dto/world.dto';

@Injectable()
export class WorldService {
  constructor(
    @InjectRepository(WorldAreaEntity)
    private worldAreaRepository: Repository<WorldAreaEntity>,
  ) {}

  async create(createWorldAreaDto: CreateWorldAreaDto): Promise<WorldAreaResponse> {
    const area = this.worldAreaRepository.create(createWorldAreaDto);
    const savedArea = await this.worldAreaRepository.save(area);
    return savedArea.toResponse();
  }

  async findAll(userId: string): Promise<WorldAreaResponse[]> {
    const areas = await this.worldAreaRepository.find({
      where: { userId },
    });
    return areas.map(area => area.toResponse());
  }

  async findOne(id: string, userId: string): Promise<WorldAreaResponse | null> {
    const area = await this.worldAreaRepository.findOne({
      where: { id, userId },
    });
    return area ? area.toResponse() : null;
  }

  async findByArea(userId: string, area: WorldArea): Promise<WorldAreaResponse | null> {
    const worldArea = await this.worldAreaRepository.findOne({
      where: { userId, area },
    });
    return worldArea ? worldArea.toResponse() : null;
  }

  async update(id: string, updateWorldAreaDto: UpdateWorldAreaDto, userId: string): Promise<WorldAreaResponse | null> {
    const area = await this.worldAreaRepository.findOne({
      where: { id, userId },
    });
    if (!area) {
      throw new NotFoundException(`World area with ID ${id} not found`);
    }

    Object.assign(area, updateWorldAreaDto);
    const updatedArea = await this.worldAreaRepository.save(area);
    return updatedArea.toResponse();
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const result = await this.worldAreaRepository.delete({ id, userId });
    return result.affected > 0;
  }

  async initializeWorld(userId: string): Promise<WorldAreaResponse[]> {
    const areas = Object.values(WorldArea);
    const createdAreas = [];
    
    for (const area of areas) {
      const areaData: CreateWorldAreaDto = {
        userId,
        area,
        name: this.getAreaName(area),
        description: this.getAreaDescription(area),
        coordinates: this.getAreaCoordinates(area),
        isExplored: area === WorldArea.FOREST_ENTRY,
        isVisible: true,
        monsterDensity: this.getMonsterDensity(area),
        hasPortal: this.hasPortal(area),
        portalType: this.getPortalType(area),
        environmentData: this.getEnvironmentData(area),
      };

      const areaEntity = this.worldAreaRepository.create(areaData);
      const savedArea = await this.worldAreaRepository.save(areaEntity);
      createdAreas.push(savedArea.toResponse());
    }
    
    return createdAreas;
  }

  async exploreArea(id: string, userId: string, exploreAreaDto: ExploreAreaDto): Promise<WorldAreaResponse | null> {
    const area = await this.worldAreaRepository.findOne({
      where: { id, userId },
    });
    if (!area) {
      throw new NotFoundException(`World area with ID ${id} not found`);
    }

    area.isExplored = true;
    area.monsterDensity = Math.max(0, area.monsterDensity - 1);

    area.environmentData = this.generateAreaEnvironment(area.area, area.isExplored);

    const updatedArea = await this.worldAreaRepository.save(area);
    return updatedArea.toResponse();
  }

  async getVisibleAreas(userId: string): Promise<WorldAreaResponse[]> {
    const areas = await this.findAll(userId);
    return areas.filter(area => area.isVisible);
  }

  async getExploredAreas(userId: string): Promise<WorldAreaResponse[]> {
    const areas = await this.findAll(userId);
    return areas.filter(area => area.isExplored);
  }
}

export { WorldAreaResponse, WorldArea };