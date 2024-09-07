import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { InventoryService, Size } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('hi')
  getHello(): string {
    return 'Hello from inventory! :)';
  }

  // GET /inventory/plant/1?size=Large -> 3
  @Get('plant/:id')
  getAmount(@Param('id') id: string, @Query('size') size: string): number {
    if (
      !size ||
      (size !== 'Small' &&
        size !== 'Medium' &&
        size !== 'Large' &&
        size !== 'Hanging Basket')
    ) {
      throw new BadRequestException('Correct size is required');
    }

    return this.inventoryService.getAmount(parseInt(id), size as Size);
  }
}
