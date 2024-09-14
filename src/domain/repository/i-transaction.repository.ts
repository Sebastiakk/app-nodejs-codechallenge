import {SaveTransactionCommand} from "@domain/models/command/save-transaction.command";
import {TransactionQuery} from "@domain/models/query/transaction.query";
import {UpdateStatusTransactionCommand} from "@domain/models/command/update-status-transaction.command";

export interface ITransactionRepository {

    saveTransaction(transaction: SaveTransactionCommand): Promise<string>;

    getTransaction(transactionId: string): Promise<TransactionQuery>;

    getAllTransactions(): Promise<TransactionQuery[]>;

    updateTransaction(transaction: UpdateStatusTransactionCommand): Promise<boolean>;

}
