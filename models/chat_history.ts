import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { MCProfiles } from "./mc_profiles";

@Entity()
export class ChatHistory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => MCProfiles, profile => profile.chat)
    player: MCProfiles;

    @Column({
        type: 'varchar',
        length: 256
    })
    message: string;

    @Column('datetime')
    timestamp: string;

}