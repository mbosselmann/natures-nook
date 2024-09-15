import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlantSize } from './plant-size.entity';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  scientific_name: string;

  @Column()
  description: string;

  @Column('simple-array')
  light_requirements: string[];

  @Column()
  water_requirements: string;

  @Column()
  care_level: string;

  @Column('simple-array')
  tags: string[];

  @OneToMany(() => PlantSize, (size) => size.plant)
  sizes: PlantSize[];
}
