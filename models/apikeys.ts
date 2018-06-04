import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class APIKeys extends BaseEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: 32
    })
    key: string;

    @Column({
        type: 'varchar',
        length: 16
    })
    name: string;

    @Column({
        type: 'varchar'
    })
    description: string;

}