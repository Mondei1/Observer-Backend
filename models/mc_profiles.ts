import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Bungeecords } from "./bungeecords";
import { Spigots } from "./spigots";
import { ChatHistory } from "./chat_history";

@Entity()
export class MCProfiles extends BaseEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: 36
    })
    uuid: string;

    @Column({
        type: 'varchar',
        length: 16
    })
    name: string;

    @Column({
        type: 'datetime'
    })
    joinedFirst: string;

    @Column({
        type: 'datetime',
        default: 0
    })
    lastLogin: string;

    @Column('tinyint')
    online: boolean;

    @Column('int')
    onlineTime: number;

    @Column('tinyint')
    afk: boolean;

    @ManyToOne(type => Bungeecords, bungeecord => bungeecord.players)
    network: Bungeecords;

    @ManyToOne(type => Spigots, spigot => spigot.players)
    server: Spigots;

    @OneToMany(type => ChatHistory, chat => chat.player)
    chat: ChatHistory;

}