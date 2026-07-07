import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Funcionario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  cargo?: string;
}
