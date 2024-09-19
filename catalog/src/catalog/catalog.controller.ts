import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('plants')
  getAllPlants(@Query('page') page: string, @Query('limit') limit: string) {
    return this.catalogService.getAllPlants(Number(page), Number(limit));
  }

  @Get('plant/:id')
  getPlantById(@Param('id') id: string) {
    return this.catalogService.getPlantById(Number(id));
  }
}
