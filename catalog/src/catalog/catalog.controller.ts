import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { SearchParams } from './catalog.types';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('plants')
  getPlants(@Query('page') page: string, @Query('limit') limit: string) {
    return this.catalogService.getPlants(Number(page), Number(limit));
  }

  @Get('plant/:id')
  getPlantById(@Param('id') id: string) {
    return this.catalogService.getPlantById(Number(id));
  }

  @Post('search')
  searchPlants(@Body() searchParams: SearchParams) {
    return this.catalogService.searchPlants(
      searchParams,
      searchParams.page,
      searchParams.limit,
    );
  }
}
