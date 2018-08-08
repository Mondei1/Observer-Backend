import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Spigots } from "./spigots";

@Entity('sessions')
export class Sessions extends BaseEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: 16
    })
    id: string;

    @ManyToOne(type => Spigots, spigot => spigot.sessions)
    server: Spigots;

    @Column({
        type: 'datetime'
    })
    started: string;

    @Column({
        type: 'datetime',
        nullable: true
    })
    ended: string;

}