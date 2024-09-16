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
  ) {}

  getAllPlants() {
    const catalog = this.plantRepository.find({ relations: ['sizes'] });
    return catalog;
    // return catalog.map((plant) => ({
    //   ...plant,
    //   sizes: plant.sizes.map((size) => ({
    //     ...size,
    //     amount: Object.values(inventory).filter(
    //       (item) => item.id === plant.id && item.size === size.size,
    //     ).length,
    //   })),
    // }));
  }

  getPlantById(id: number) {
    return this.plantRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });
    // const plant = catalog.find((plant) => plant.id === id);
    // if (!plant) {
    //   return null;
    // }

    // return {
    //   ...plant,
    //   sizes: plant.sizes.map((size) => ({
    //     ...size,
    //     amount: Object.values(inventory).filter(
    //       (item) => item.id === plant.id && item.size === size.size,
    //     ).length,
    //   })),
    // };
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
