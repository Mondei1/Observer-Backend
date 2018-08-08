import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, AfterUpdate, AfterInsert, ManyToOne } from "typeorm";
import { validateOrReject } from 'class-validators';
import { Bungeecords } from "./bungeecords";

@Entity()
export class Join_History extends BaseEntity {

    @PrimaryColumn({
        default: Date.now()/1000 |0,
        type: "bigint"
    })
    timestamp: number;

    @Column({
        length: 36,
        type: 'varchar'
    })
    player: string;

    @ManyToOne(type => Bungeecords, bungeecords => bungeecords.joinHistory)
    network: Bungeecords;

    @AfterUpdate()
    @AfterInsert()
    async check() {
        try {
            await validateOrReject(this);
        } catch(error) {
        }
    }

}