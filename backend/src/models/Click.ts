import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Url } from './Url';

@Entity('clicks')
export class Click {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ipAddress!: string;

    @CreateDateColumn()
    clickedAt!: Date;

    @ManyToOne(() => Url, url => url.clicks)
    url!: Url;
}