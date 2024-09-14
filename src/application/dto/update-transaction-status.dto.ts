import {ApiProperty} from '@nestjs/swagger';
import {TransactionStatusEnum} from "@domain/enums/transaction-status.enum";


export class UpdateTransactionStatusDto {

    @ApiProperty({
        type: String,
        format: 'uuid',
        description: 'Identificador de la transacción que se almaceno en la base de datos',
    })
    transactionId: string;

    @ApiProperty({
        enum: TransactionStatusEnum,
        description: 'Estado de la transacción',
        example: TransactionStatusEnum.APPROVED,
    })
    transactionStatus: TransactionStatusEnum;

}
