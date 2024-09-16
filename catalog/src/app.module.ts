import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './catalog/catalog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './catalog/entities/plant.entity';
import { PlantSize } from './catalog/entities/plant-size.entity';
import { ReadModel } from './catalog/entities/read-model.entity';
@Module({
  imports: [
    CatalogModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'catalog_user',
      password: 'catalog_pass',
      database: 'catalog_db',
      entities: [Plant, PlantSize, ReadModel],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
