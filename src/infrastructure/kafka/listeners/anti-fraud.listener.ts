import {Inject, Injectable} from "@nestjs/common";
import {ClientKafka} from "@nestjs/microservices";
import {IAntiFraudRepository} from "@domain/repository/i-anti-fraud.repository";
import {TransactionStatusEnum} from "@domain/enums/transaction-status.enum";
import {firstValueFrom} from "rxjs";
import {UpdateTransactionStatusDto} from "@application/dto/update-transaction-status.dto";
import {TOPIC_NAMES} from "@infrastructure/kafka/listeners/topic-names.const";


@Injectable()
export class AntiFraudListener implements IAntiFraudRepository {


    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
    ) {
    }

    async validateTransaction(transactionId: string): Promise<void> {
        const eventName = TOPIC_NAMES.TRANSACTION_STATUS_VALIDATE;
        await firstValueFrom(this.kafkaClient.emit(eventName, {value: transactionId}));
    }

    async markAsTransactionRejected(transactionId: string): Promise<void> {
        const eventName = TOPIC_NAMES.TRANSACTION_STATUS_REJECTED;
        await firstValueFrom(this.kafkaClient.emit(eventName, {value: transactionId}));
    }

    async markAsTransactionApproved(transactionId: string): Promise<void> {
        const eventName = TOPIC_NAMES.TRANSACTION_STATUS_APPROVED;
        await firstValueFrom(this.kafkaClient.emit(eventName, {value: transactionId}));
    }

    async updateTransaction(transactionId: string, transactionStatus: TransactionStatusEnum): Promise<void> {
        const eventName = TOPIC_NAMES.TRANSACTION_STATUS_UPDATED;
        const updateTransactionStatusDto: UpdateTransactionStatusDto = {transactionId, transactionStatus};
        await firstValueFrom(this.kafkaClient.emit(eventName, {value: updateTransactionStatusDto}));
    }
}
