import { Injectable, OnModuleInit } from '@nestjs/common';
import { catalog } from './catalog';
import { KafkaService } from 'src/kafka/kafka.service';

type Size = 'Small' | 'Medium' | 'Large' | 'Hanging Basket';

type InventoryItem = {
  inventoryId: number;
  id: number;
  size: Size;
};

// read model
const inventory: { [key: number]: InventoryItem } = {};

@Injectable()
export class CatalogService implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  getAllPlants() {
    return catalog.map((plant) => ({
      ...plant,
      sizes: plant.sizes.map((size) => ({
        ...size,
        amount: Object.values(inventory).filter(
          (item) => item.id === plant.id && item.size === size.size,
        ).length,
      })),
    }));
  }

  getPlantById(id: number) {
    const plant = catalog.find((plant) => plant.id === id);
    if (!plant) {
      return null;
    }

    return {
      ...plant,
      sizes: plant.sizes.map((size) => ({
        ...size,
        amount: Object.values(inventory).filter(
          (item) => item.id === plant.id && item.size === size.size,
        ).length,
      })),
    };
  }

  onModuleInit() {
    this.kafkaService.consume('data.inventory', (message) => {
      const { id: inventoryId, catalogId: id, size } = JSON.parse(message);
      inventory[inventoryId] = { inventoryId, id, size };
    });
    console.log('CatalogService has been initialized.');
  }
}
