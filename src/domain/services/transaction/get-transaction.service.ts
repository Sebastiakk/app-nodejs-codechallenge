import {ITransactionRepository} from "@domain/repository/i-transaction.repository";
import {TransactionQuery} from "@domain/models/query/transaction.query";

export class GetTransactionService {

    constructor(
        private readonly transactionRepository: ITransactionRepository,
    ) {
    }

    async run(transactionId: string): Promise<TransactionQuery> {
        return this.transactionRepository.getTransaction(transactionId);
    }

}
