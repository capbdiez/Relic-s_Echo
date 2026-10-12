import { Injectable, NotFoundException, InjectRepository } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Inventory, InventoryResponse, ItemType, Rarity } from './entities/inventory.entity';
import { CreateInventoryDto, UpdateInventoryDto, UseItemDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<InventoryResponse> {
    const inventoryItem = this.inventoryRepository.create(createInventoryDto);
    const savedItem = await this.inventoryRepository.save(inventoryItem);
    return savedItem.toResponse();
  }

  async findAll(userId: string): Promise<InventoryResponse[]> {
    const items = await this.inventoryRepository.find({
      where: { userId },
    });
    return items.map(item => item.toResponse());
  }

  async findOne(id: string, userId: string): Promise<InventoryResponse | null> {
    const item = await this.inventoryRepository.findOne({
      where: { id, userId },
    });
    return item ? item.toResponse() : null;
  }

  async findByType(userId: string, itemType: ItemType): Promise<InventoryResponse[]> {
    const items = await this.inventoryRepository.find({
      where: { userId, itemType },
    });
    return items.map(item => item.toResponse());
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto, userId: string): Promise<InventoryResponse | null> {
    const item = await this.inventoryRepository.findOne({
      where: { id, userId },
    });
    if (!item) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }

    Object.assign(item, updateInventoryDto);
    const updatedItem = await this.inventoryRepository.save(item);
    return updatedItem.toResponse();
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const result = await this.inventoryRepository.delete({ id, userId });
    return result.affected > 0;
  }

  async useItem(id: string, userId: string, useItemDto: UseItemDto): Promise<InventoryResponse | null> {
    const item = await this.inventoryRepository.findOne({
      where: { id, userId },
    });
    if (!item) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }

    if (!item.isUsable) {
      throw new Error('This item cannot be used');
    }

    if (item.quantity <= 0) {
      throw new Error('Item quantity is insufficient');
    }

    // Apply item effects based on item type
    switch (item.itemType) {
      case ItemType.CONSUMABLE:
        // Restore health, mana, etc.
        if (item.name.toLowerCase().includes('potion')) {
          // Restore some health/mana
          item.quantity -= 1;
        }
        break;
      case ItemType.WEAPON:
        // Weapon durability decreases when used
        if (item.durability > 0) {
          item.durability = Math.max(0, item.durability - 1);
        }
        break;
      case ItemType.ARMOR:
        // Armor durability decreases when used
        if (item.durability > 0) {
          item.durability = Math.max(0, item.durability - 1);
        }
        break;
    }

    // Decrease quantity if not consumed
    if (useItemDto.consume && item.quantity > 0) {
      item.quantity -= 1;
    }

    const updatedItem = await this.inventoryRepository.save(item);
    return updatedItem.toResponse();
  }

  async equipItem(id: string, userId: string): Promise<InventoryResponse | null> {
    const item = await this.inventoryRepository.findOne({
      where: { id, userId },
    });
    if (!item) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }

    if (item.isEquipped) {
      // Unequip item
      item.isEquipped = false;
    } else {
      // Equip item
      item.isEquipped = true;
    }

    const updatedItem = await this.inventoryRepository.save(item);
    return updatedItem.toResponse();
  }

  async getInventorySummary(userId: string): Promise<any> {
    const items = await this.findAll(userId);
    
    const totalValue = items.reduce((sum, item) => sum + (item.value * item.quantity), 0);
    const equippedItems = items.filter(item => item.isEquipped);
    const usableItems = items.filter(item => item.isUsable);
    const highValueItems = items.filter(item => item.rarity === Rarity.EPIC || item.rarity === Rarity.LEGENDARY);

    return {
      totalItems: items.length,
      totalValue,
      equippedItems: equippedItems.length,
      usableItems: usableItems.length,
      highValueItems: highValueItems.length,
      itemsByType: {
        weapons: items.filter(item => item.itemType === ItemType.WEAPON).length,
        armor: items.filter(item => item.itemType === ItemType.ARMOR).length,
        consumables: items.filter(item => item.itemType === ItemType.CONSUMABLE).length,
        relics: items.filter(item => item.itemType === ItemType.RELIC).length,
        souls: items.filter(item => item.itemType === ItemType.SOUL).length,
        gems: items.filter(item => item.itemType === ItemType.GEM).length,
      },
    };
  }

  async addLoot(userId: string, lootItems: any[]): Promise<InventoryResponse[]> {
    const createdItems = [];
    for (const lootItem of lootItems) {
      const inventoryItem = this.inventoryRepository.create({
        ...lootItem,
        userId,
      });
      const savedItem = await this.inventoryRepository.save(inventoryItem);
      createdItems.push(savedItem.toResponse());
    }
    return createdItems;
  }
}

export { InventoryResponse, ItemType, Rarity };