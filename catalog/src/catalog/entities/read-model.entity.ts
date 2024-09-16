import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReadModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  catalogId: number;

  @Column()
  size: string;
}
