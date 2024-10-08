import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { KafkaModule } from 'src/kafka/kafa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantSize } from './entities/plant-size.entity';
import { Plant } from './entities/plant.entity';
import { ReadModel } from './entities/read-model.entity';

@Module({
  imports: [
    KafkaModule,
    TypeOrmModule.forFeature([Plant, PlantSize, ReadModel]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
