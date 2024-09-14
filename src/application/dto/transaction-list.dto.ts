import {ApiProperty} from '@nestjs/swagger';


export class TransactionListDto {

    @ApiProperty()
    transactionExternalId: string;

    @ApiProperty()
    transactionType: Transaction;

    @ApiProperty()
    transactionStatus: Transaction;

    @ApiProperty()
    value: number;

    @ApiProperty()
    createdAt: Date;

}

export interface Transaction {
    name: string;
}


