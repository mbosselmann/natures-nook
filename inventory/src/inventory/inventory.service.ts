import { Injectable, OnModuleInit } from '@nestjs/common';
import { inventory } from './inventory';

export type Size = 'Small' | 'Medium' | 'Large' | 'Hanging Basket';

@Injectable()
export class InventoryService implements OnModuleInit {
  onModuleInit() {
    inventory.forEach((item) => {
      // kafka send message
      console.log('InventoryService has been initialized.');
    });
  }
  getAmount(id: number, size: Size): number {
    return inventory.filter(
      (item) => item.catalogId === id && item.size === size,
    ).length;
  }
}
