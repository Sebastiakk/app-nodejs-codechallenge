import {Body, Controller, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {SaveTransactionDto} from "@application/dto/save-transaction.dto";
import {UpdateTransactionStatusDto} from "@application/dto/update-transaction-status.dto";
import {TransactionService} from "@application/services/transaction.service";
import {TransactionListDto} from "@application/dto/transaction-list.dto";
import {TOPIC_NAMES} from "@infrastructure/kafka/listeners/topic-names.const";

@ApiTags('Transacciones')
@Controller('transaction')
export class TransactionsController {
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
        private readonly transactionService: TransactionService
    ) {
    }

    @Post('create')
    @ApiOperation({
        summary: 'Crea una transacción',
        description: 'Este endpoint permite crear una nueva transacción. Envía los datos necesarios y devuelve un mensaje de Kafka indicando que la transacción ha sido creada.',
    })
    createTransaction(@Body() createTransactionDto: SaveTransactionDto) {
        return this.kafkaClient.emit(TOPIC_NAMES.TRANSACTION_CREATED, {value: createTransactionDto});
    }


    @Put('update-status')
    @ApiOperation({
        summary: 'Actualiza el estado de una transacción de manera manual',
        description: 'Este endpoint permite actualizar el estado de una transacción de forma manual, enviando un mensaje a Kafka para notificar el cambio de estado.',
    })
    updateTransactionStatus(@Body() updateTransactionStatusDto: UpdateTransactionStatusDto) {
        return this.kafkaClient.emit(TOPIC_NAMES.TRANSACTION_STATUS_UPDATED, {value: updateTransactionStatusDto});
    }


    @Get('get-transaction')
    @ApiOperation({
        summary: 'Obtiene todas las transacciones',
        description: 'Este endpoint permite obtener todas las transacciones almacenadas en la base de datos.',
    })
    getAllTransactions(): Promise<TransactionListDto[]> {
        return this.transactionService.getAllTransactions();
    }

    @Get('get-transaction/:id')
    @ApiOperation({
        summary: 'Obtiene una transacción',
        description: 'Este endpoint permite obtener una transacción a partir de su identificador.',
    })
    getTransaction(@Param('id') id: string): Promise<TransactionListDto> {
        return this.transactionService.getTransaction(id);
    }


}
