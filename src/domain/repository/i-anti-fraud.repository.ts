import {TransactionStatusEnum} from "@domain/enums/transaction-status.enum";

export interface IAntiFraudRepository {

    validateTransaction(transactionId: string): Promise<void>;

    markAsTransactionRejected(transactionId: string): Promise<void>;

    markAsTransactionApproved(transactionId: string): Promise<void>;

    updateTransaction(transactionId: string, value: TransactionStatusEnum): Promise<void>;

}
