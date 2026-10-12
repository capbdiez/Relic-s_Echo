import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto, UseItemDto, AddLootDto } from './dto/inventory.dto';
import { ItemType } from './entities/inventory.entity';

@Controller('api/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.inventoryService.findAll(userId);
  }

  @Get(':id/user/:userId')
  findOne(@Param('id') id: string, @Param('userId') userId: string) {
    return this.inventoryService.findOne(id, userId);
  }

  @Get('user/:userId/type/:itemType')
  findByType(@Param('userId') userId: string, @Param('itemType') itemType: ItemType) {
    return this.inventoryService.findByType(userId, itemType);
  }

  @Put(':id/user/:userId')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto, @Param('userId') userId: string) {
    return this.inventoryService.update(id, updateInventoryDto, userId);
  }

  @Delete(':id/user/:userId')
  remove(@Param('id') id: string, @Param('userId') userId: string) {
    return this.inventoryService.remove(id, userId);
  }

  @Post(':id/use/user/:userId')
  useItem(@Param('id') id: string, @Body() useItemDto: UseItemDto, @Param('userId') userId: string) {
    return this.inventoryService.useItem(id, userId, useItemDto);
  }

  @Post(':id/equip/user/:userId')
  equipItem(@Param('id') id: string, @Param('userId') userId: string) {
    return this.inventoryService.equipItem(id, userId);
  }

  @Get('user/:userId/summary')
  getInventorySummary(@Param('userId') userId: string) {
    return this.inventoryService.getInventorySummary(userId);
  }

  @Post('loot')
  addLoot(@Body() addLootDto: AddLootDto) {
    return this.inventoryService.addLoot(addLootDto.userId, addLootDto as any);
  }
}