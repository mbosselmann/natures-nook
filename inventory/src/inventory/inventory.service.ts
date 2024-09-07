import { Injectable, OnModuleInit } from '@nestjs/common';
import { inventory } from './inventory';
import { KafkaService } from 'src/kafka/kafka.service';

export type Size = 'Small' | 'Medium' | 'Large' | 'Hanging Basket';

@Injectable()
export class InventoryService implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  onModuleInit() {
    inventory.forEach((item) => {
      this.kafkaService.send(
        'data.inventory',
        String(item.id),
        JSON.stringify(item),
      );
    });
    console.log('InventoryService has been initialized.');
  }

  getAmount(id: number, size: Size): number {
    return inventory.filter(
      (item) => item.catalogId === id && item.size === size,
    ).length;
  }
}
