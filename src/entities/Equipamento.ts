import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Equipamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  setor?: string;
}
