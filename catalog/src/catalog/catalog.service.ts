import { Injectable, OnModuleInit } from '@nestjs/common';
import { catalog } from './catalog';
import { KafkaService } from 'src/kafka/kafka.service';

const inventory = {};

@Injectable()
export class CatalogService implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  getAllPlants() {
    console.log(inventory);

    return catalog;
  }

  onModuleInit() {
    this.kafkaService.consume('data.inventory', (message) => {
      const { id: inventoryId, catalogId, size } = JSON.parse(message);
      inventory[inventoryId] = { inventoryId, catalogId, size };
    });
    console.log('CatalogService has been initialized.');
  }
}
