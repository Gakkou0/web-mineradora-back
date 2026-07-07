import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  descricao?: string;
}
