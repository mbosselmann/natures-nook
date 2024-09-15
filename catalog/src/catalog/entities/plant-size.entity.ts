import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plant } from './plant.entity';

@Entity()
export class PlantSize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  catalogId: number;

  @Column()
  size: string;

  @Column()
  height: string;

  @Column()
  price: number;

  @ManyToOne(() => Plant, (plant) => plant.sizes)
  @JoinColumn({ name: 'catalogId' })
  plant: Plant;
}
