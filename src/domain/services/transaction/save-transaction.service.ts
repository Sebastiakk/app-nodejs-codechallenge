import {ITransactionRepository} from "@domain/repository/i-transaction.repository";
import {SaveTransactionCommand} from "@domain/models/command/save-transaction.command";
import {IAntiFraudRepository} from "@domain/repository/i-anti-fraud.repository";

export class SaveTransactionService {

    constructor(
        private readonly transactionRepository: ITransactionRepository,
        private readonly antiFraudRepository: IAntiFraudRepository,
    ) {
    }

    async run(transaction: SaveTransactionCommand): Promise<string> {
        const transactionId = await this.transactionRepository.saveTransaction(transaction);
        await this.validateTransaction(transactionId);
        return transactionId;
    }

    validateTransaction(transactionId: string): Promise<void> {
        return this.antiFraudRepository.validateTransaction(transactionId);
    }
}
