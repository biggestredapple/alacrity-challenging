/* eslint-disable indent */
import { Entity, Column } from 'typeorm';
import Model from './model.entity';

@Entity('data')
export class DataEntity extends Model {
  @Column({ type: 'varchar' })
  iv: string;

  @Column({ type: 'text' })
  value: string;
}
