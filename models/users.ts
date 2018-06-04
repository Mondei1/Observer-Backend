import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    username: string;

    @Column('varchar')
    password: string;

    /**
     * + = Everything is fine.
     * -ID (negative number) = Banned (ID) 
     */
    @Column({
        type: "varchar",
        length: 1
    })
    state: string;

    @Column({
        type: 'simple-array',
        nullable: true
    })
    permissions: Array<any>

    @Column({
        type: 'bigint',
        default: Date.now()/1000 |0
    })
    createdAt: number

    @Column({
        type: 'bigint',
        default: 0
    })
    lastChange: number;

    @Column({
        type: 'bigint',
        default: 0
    })
    lastLogin: number;

}