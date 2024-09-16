import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlantSize } from './plant-size.entity';

@Entity()
export class ReadModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  catalogId: number;

  @Column()
  size: string;

  @ManyToOne(() => PlantSize, (plantSize) => plantSize.readModels)
  @JoinColumn([
    { name: 'catalogId', referencedColumnName: 'catalogId' },
    { name: 'size', referencedColumnName: 'size' },
  ])
  plantSize: PlantSize;
}
