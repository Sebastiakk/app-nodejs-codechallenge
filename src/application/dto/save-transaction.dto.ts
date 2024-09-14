import {ApiProperty} from '@nestjs/swagger';


export class SaveTransactionDto {

    @ApiProperty({type: String, format: 'uuid'})
    accountExternalIdDebit: string;

    @ApiProperty({type: String, format: 'uuid'})
    accountExternalIdCredit: string;

    @ApiProperty()
    transferTypeId: number

    @ApiProperty()
    value: number
}
