import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { WorldService } from './world.service';
import { CreateWorldAreaDto, UpdateWorldAreaDto, ExploreAreaDto } from './dto/world.dto';
import { WorldArea } from './entities/world-area.entity';

@Controller('api/world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Post()
  create(@Body() createWorldAreaDto: CreateWorldAreaDto) {
    return this.worldService.create(createWorldAreaDto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.worldService.findAll(userId);
  }

  @Get(':id/user/:userId')
  findOne(@Param('id') id: string, @Param('userId') userId: string) {
    return this.worldService.findOne(id, userId);
  }

  @Get('user/:userId/area/:area')
  findByArea(@Param('userId') userId: string, @Param('area') area: WorldArea) {
    return this.worldService.findByArea(userId, area);
  }

  @Put(':id/user/:userId')
  update(@Param('id') id: string, @Body() updateWorldAreaDto: UpdateWorldAreaDto, @Param('userId') userId: string) {
    return this.worldService.update(id, updateWorldAreaDto, userId);
  }

  @Delete(':id/user/:userId')
  remove(@Param('id') id: string, @Param('userId') userId: string) {
    return this.worldService.remove(id, userId);
  }

  @Post('initialize/user/:userId')
  initializeWorld(@Param('userId') userId: string) {
    return this.worldService.initializeWorld(userId);
  }

  @Post(':id/explore/user/:userId')
  exploreArea(
    @Param('id') id: string, 
    @Body() exploreAreaDto: ExploreAreaDto, 
    @Param('userId') userId: string
  ) {
    return this.worldService.exploreArea(id, userId, exploreAreaDto);
  }

  @Get('user/:userId/visible')
  getVisibleAreas(@Param('userId') userId: string) {
    return this.worldService.getVisibleAreas(userId);
  }

  @Get('user/:userId/explored')
  getExploredAreas(@Param('userId') userId: string) {
    return this.worldService.getExploredAreas(userId);
  }

  @Post('user/:userId/generate/next/:currentArea')
  generateNextArea(
    @Param('userId') userId: string, 
    @Param('currentArea') currentArea: WorldArea
  ) {
    return this.worldService.generateNextArea(userId, currentArea);
  }
}