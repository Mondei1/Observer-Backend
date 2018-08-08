import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Spigots } from "./spigots";
import { MCProfiles } from "./mc_profiles";
import { Join_History } from "./join_history";

@Entity('bungeecords')
export class Bungeecords extends BaseEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: 8
    })
    id: string;

    // E.g.: "Beta network" or "Main network"
    @Column({
        type: 'varchar',
        length: 64
    })
    name: string;

    // E.g.: "This bungeecord is only for beta testing." or "This is the main bungeecord"
    @Column('text')
    description: string;

    // To know on which machine this bungeecord runs.
    @Column({
        type: 'varchar',
        length: 17
    })
    macAddress: string;

    // Relation to spigot servers run under this bungeecord.
    @OneToMany(type => Spigots, spigot => spigot.bungeecord, {
        nullable: true
    })
    servers: Spigots[];

    @OneToMany(type => MCProfiles, profile => profile.network, {
        nullable: true
    })
    players: MCProfiles[];

    @OneToMany(type => Join_History, history => history.network, {
        nullable: true
    })
    joinHistory: Join_History[];

}