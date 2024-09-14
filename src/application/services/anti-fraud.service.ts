import {Injectable} from "@nestjs/common";
import {ValidateTransactionService} from "@domain/services/anti-fraud/validate-transaction.service";
import {TransactionApprovedService} from "@domain/services/anti-fraud/transaction-approved.service";
import {TransactionRejectedService} from "@domain/services/anti-fraud/transaction-rejected.service";


@Injectable()
export class AntiFraudService {

    constructor(
        private readonly validateTransactionService: ValidateTransactionService,
        private readonly validTransactionService: TransactionApprovedService,
        private readonly invalidTransactionService: TransactionRejectedService,
    ) {
    }

    validateTransaction(transactionId: string): Promise<void> {
        return this.validateTransactionService.run(transactionId);
    }

    transactionApproved(transactionId: string): Promise<void> {
        return this.validTransactionService.run(transactionId);
    }

    transactionRejected(transactionId: string): Promise<void> {
        return this.invalidTransactionService.run(transactionId);
    }
}
