import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Click } from './Click';

@Entity('urls')
export class Url {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    shortCode!: string;

    @Column()
    originalUrl!: string;

    @Column({ nullable: true })
    alias?: string;

    @Column({ nullable: true })
    expiresAt?: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ default: 0 })
    clickCount!: number;

    @OneToMany(() => Click, click => click.url)
    clicks!: Click[];
}
