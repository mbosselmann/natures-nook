import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from './entities/plant.entity';
import { Repository } from 'typeorm';
import { ReadModel } from './entities/read-model.entity';

@Injectable()
export class CatalogService implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
    @InjectRepository(ReadModel)
    private readonly readModelRepository: Repository<ReadModel>,
    // @InjectRepository(PlantSize)
    // private readonly plantSizeRepository: Repository<PlantSize>,
  ) {}

  async getAllPlants(page: number = 1, limit: number = 12) {
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
