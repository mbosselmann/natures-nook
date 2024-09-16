import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plant } from './plant.entity';
import { ReadModel } from './read-model.entity';

@Entity()
@Index(['catalogId', 'size'], { unique: true })
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

  @OneToMany(() => ReadModel, (readModel) => readModel.plantSize)
  readModels: ReadModel[];
}
