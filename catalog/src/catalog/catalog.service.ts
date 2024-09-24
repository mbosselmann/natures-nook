import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from './entities/plant.entity';
import { Repository } from 'typeorm';
import { ReadModel } from './entities/read-model.entity';
import { SearchParams } from './catalog.types';

@Injectable()
export class CatalogService implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
    @InjectRepository(ReadModel)
    private readonly readModelRepository: Repository<ReadModel>,
  ) {}

  async getPlants(page: number = 1, limit: number = 12) {
    const [catalog, total] = await this.plantRepository.findAndCount({
      relations: ['sizes', 'sizes.readModels'],
      skip: (page - 1) * limit,
      take: limit,
    });

    const plants = catalog.map((plant) => ({
      ...plant,
      sizes: plant.sizes.map((size) => ({
        ...size,
        amount: size.readModels ? size?.readModels?.length : 0,
      })),
    }));

    return {
      data: plants,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getPlantById(id: number) {
    const plant = await this.plantRepository.findOne({
      where: { id },
      relations: ['sizes', 'sizes.readModels'],
    });

    if (!plant) {
      return null;
    }

    return {
      ...plant,
      sizes: plant.sizes.map((size) => ({
        ...size,
        amount: size?.readModels?.length ?? 0,
      })),
    };
  }

  async searchPlants(
    searchParams: SearchParams,
    page: number = 1,
    limit: number = 12,
  ) {
    const search = searchParams?.searchTerm.toLowerCase();
    const catalog = await this.plantRepository.find({
      relations: ['sizes', 'sizes.readModels'],
    });

    let filtered = catalog;

    if (search) {
      filtered = filtered.filter((plant) => {
        return (
          plant.name.toLowerCase().includes(search) ||
          plant.scientific_name.toLowerCase().includes(search)
        );
      });
    }
    if (searchParams?.careLevel.length) {
      filtered = filtered.filter((plant) => {
        return searchParams.careLevel.includes(plant.care_level);
      });
    }

    if (searchParams?.categories.length) {
      filtered = filtered.filter((plant) => {
        return searchParams.categories.every((category) =>
          plant.tags.includes(category),
        );
      });
    }

    if (searchParams?.order) {
      const params = searchParams.order.split('-');
      const order = params[0];
      const direction = params[1];

      if (order === 'price') {
        filtered = [...filtered].sort((a, b) => {
          if (direction === 'desc') {
            return a.sizes[0].price - b.sizes[0].price;
          } else {
            return b.sizes[0].price - a.sizes[0].price;
          }
        });
      }

      filtered = [...filtered].sort((a, b) => {
        if (direction === 'asc') {
          return a[order] > b[order] ? 1 : -1;
        } else {
          return a[order] < b[order] ? 1 : -1;
        }
      });
    }
    const total = filtered.length;
    const skip = (page - 1) * limit;
    filtered = filtered.slice(skip, skip + limit);

    return {
      data: filtered,
      total: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  onModuleInit() {
    this.kafkaService.consume('data.inventory', async (message) => {
      try {
        const { id: inventoryId, catalogId: id, size } = JSON.parse(message);

        const existingInventory = await this.readModelRepository.findOne({
          where: { id: inventoryId },
        });

        if (existingInventory) {
          existingInventory.catalogId = id;
          existingInventory.size = size;
          await this.readModelRepository.save(existingInventory);
          console.log(
            `Updated inventory with ID ${inventoryId} in the database.`,
          );
        } else {
          const newInventory = this.readModelRepository.create({
            id: inventoryId,
            catalogId: id,
            size,
          });
          await this.readModelRepository.save(newInventory);
          console.log(
            `Saved new inventory with ID ${inventoryId} to the database.`,
          );
        }
      } catch (error) {
        console.error('Error saving inventory:', error);
      }
    });
  }
}
