import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { KafkaModule } from 'src/kafka/kafa.module';

@Module({
  imports: [KafkaModule],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
