import { Controller, Get, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('plants')
  getAllPlants() {
    return this.catalogService.getAllPlants();
  }

  @Get('plant/:id')
  getPlantById(@Param('id') id: string) {
    return this.catalogService.getPlantById(Number(id));
  }
}
