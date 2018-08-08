import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Bungeecords } from "./bungeecords";
import { Sessions } from "./sessions";
import { MCProfiles } from "./mc_profiles";

@Entity('spigots')
export class Spigots extends BaseEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: 8
    })
    id: string;

    @Column({
        type: 'varchar',
        length: 64
    })
    name: string;

    @Column('int')
    port: number;

    @Column('text')
    description: string;

    @Column('tinyint')
    temp: boolean;

    // Relation to bungeecord server.
    @ManyToOne(type => Bungeecords, bungee => bungee.servers)
    bungeecord: Bungeecords;

    @OneToMany(type => Sessions, session => session.server, {
        nullable: true
    })
    sessions: Sessions[];

    @OneToMany(type => MCProfiles, profiles => profiles.server)
    players: MCProfiles[]

}