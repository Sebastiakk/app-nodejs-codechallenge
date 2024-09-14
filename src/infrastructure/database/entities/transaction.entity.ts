import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsEnum, IsNumber, IsPositive, IsUUID} from 'class-validator';
import {TransactionStatusEnum} from "@domain/enums/transaction-status.enum";


@Entity()
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsUUID()
    @Column({
        type: 'uuid',
        nullable: false,
    })
    accountExternalIdDebit: string;

    @IsUUID()
    @Column({
        type: 'uuid',
        nullable: false,
    })
    accountExternalIdCredit: string;

    @IsEnum(TransactionStatusEnum)
    @Column({
        type: 'enum',
        enum: TransactionStatusEnum,
        default: TransactionStatusEnum.PENDING,
        nullable: false,
    })
    transactionStatus: TransactionStatusEnum;


    @IsNumber()
    @IsPositive()
    @Column({
        type: 'integer',
        nullable: false,
    })
    value: number;

    @IsNumber()
    @IsPositive()
    @Column({
        type: 'integer',
        nullable: false,
    })
    transactionType: number;

    @CreateDateColumn()
    createdAt: Date;

}
