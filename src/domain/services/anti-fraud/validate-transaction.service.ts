import {ITransactionRepository} from "@domain/repository/i-transaction.repository";
import {IAntiFraudRepository} from "@domain/repository/i-anti-fraud.repository";

export class ValidateTransactionService {

    private readonly MAX_VALUE = 1000;

    constructor(
        private readonly transactionRepository: ITransactionRepository,
        private readonly antiFraudRepository: IAntiFraudRepository
    ) {
    }


    async run(transactionId: string): Promise<void> {
        const traction = await this.transactionRepository.getTransaction(transactionId);

        if (traction.value > this.MAX_VALUE) {
            return this.markAsTransactionInvalid(transactionId);
        }

        return this.markAsTransactionValid(transactionId);
    }

    markAsTransactionInvalid(transactionId: string): Promise<void> {
        return this.antiFraudRepository.markAsTransactionRejected(transactionId);
    }

    markAsTransactionValid(transactionId: string): Promise<void> {
        return this.antiFraudRepository.markAsTransactionApproved(transactionId);
    }

}
