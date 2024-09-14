import {Controller, Logger} from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {TransactionService} from "@application/services/transaction.service";
import {SaveTransactionDto} from "@application/dto/save-transaction.dto";
import {AntiFraudService} from "@application/services/anti-fraud.service";
import {UpdateTransactionStatusDto} from "@application/dto/update-transaction-status.dto";

@Controller()
export class TransactionsMessaging {
    constructor(
        private readonly transactionService: TransactionService,
        private readonly antiFraudService: AntiFraudService
    ) {
    }

    @MessagePattern('transaction.created')
    async handleTransactionCreated(@Payload() message: SaveTransactionDto) {
        Logger.debug(message, 'handleTransactionCreated');
        const idTransaction = await this.transactionService.saveTransaction(message);
        Logger.debug(idTransaction, 'handleTransactionCreated');
    }

    @MessagePattern('transaction.status.validate')
    async handleTransactionStatusValidate(@Payload() transactionId: string) {
        Logger.debug(transactionId, 'handleTransactionStatusValidate');
        await this.antiFraudService.validateTransaction(transactionId);
    }

    @MessagePattern('transaction.status.approved')
    async handleTransactionStatusApproved(@Payload() transactionId: string) {
        Logger.debug(transactionId, 'handleTransactionStatusApproved');
        await this.antiFraudService.transactionApproved(transactionId);
    }

    @MessagePattern('transaction.status.rejected')
    async handleTransactionStatusRejected(@Payload() transactionId: string) {
        Logger.debug(transactionId, 'handleTransactionStatusRejected');
        await this.antiFraudService.transactionRejected(transactionId);
    }

    @MessagePattern('transaction.status.updated')
    async handleTransactionStatusUpdated(@Payload() message: UpdateTransactionStatusDto) {
        Logger.debug(message, 'handleTransactionStatusUpdated');
        await this.transactionService.updateTransactionStatus(message);
    }
}
