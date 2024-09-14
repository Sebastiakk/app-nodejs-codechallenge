import {ITransactionRepository} from "@domain/repository/i-transaction.repository";
import {TransactionQuery} from "@domain/models/query/transaction.query";

export class GetAllTransactionService {

    constructor(
        private readonly transactionRepository: ITransactionRepository,
    ) {
    }

    async run(): Promise<TransactionQuery[]> {
        return this.transactionRepository.getAllTransactions();
    }

}
