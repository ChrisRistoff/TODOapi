import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

@Entity()
export class Task {
  
  @PrimaryGeneratedColumn('uuid')
  // @ts-ignore
  id: string;

  @Column({type: 'text'})
  // @ts-ignore
  title: string;

  @Column({type: 'varchar', length: 255})
  // @ts-ignore
  date: Date;

  @Column({type: 'text'})
  // @ts-ignore
  description: string;

  @Column({type: 'enum', enum: Priority, default: Priority.low})
  // @ts-ignore
  priority: Priority;

  @Column({type: 'enum', enum: Status, default: Status.todo})
  // @ts-ignore
  status: Status;

} 
