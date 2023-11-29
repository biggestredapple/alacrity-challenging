/* eslint-disable indent */
import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';

export default abstract class Model extends BaseEntity {
  @PrimaryColumn('varchar')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
