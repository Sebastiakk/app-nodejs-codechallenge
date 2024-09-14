import {ITransactionRepository} from "@domain/repository/i-transaction.repository";
import {UpdateStatusTransactionCommand} from "@domain/models/command/update-status-transaction.command";

export class UpdateStatusTransactionService {

    constructor(
        private readonly transactionRepository: ITransactionRepository,
    ) {
    }

    async run(transaction: UpdateStatusTransactionCommand): Promise<boolean> {
        return this.transactionRepository.updateTransaction(transaction);
    }

}
