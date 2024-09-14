import {Provider} from "@nestjs/common";
import {TransactionRepository} from "@infrastructure/database/repository/transaction.repository";
import {SaveTransactionService} from "@domain/services/transaction/save-transaction.service";
import {AntiFraudListener} from "@infrastructure/kafka/listeners/anti-fraud.listener";
import {UpdateStatusTransactionService} from "@domain/services/transaction/update-status-transaction.service";
import {GetTransactionService} from "@domain/services/transaction/get-transaction.service";
import {GetAllTransactionService} from "@domain/services/transaction/get-all-transaction.service";

export const TRANSACTION_BEAN: Provider[] = [
    {
        provide: SaveTransactionService,
        useFactory: (transactionRepository, antiFraudRepository) => new SaveTransactionService(transactionRepository, antiFraudRepository),
        inject: [TransactionRepository, AntiFraudListener]
    },
    {
        provide: UpdateStatusTransactionService,
        useFactory: (transactionRepository) => new UpdateStatusTransactionService(transactionRepository),
        inject: [TransactionRepository]
    },
    {
        provide: GetTransactionService,
        useFactory: (transactionRepository) => new GetTransactionService(transactionRepository),
        inject: [TransactionRepository]
    },
    {
        provide: GetAllTransactionService,
        useFactory: (transactionRepository) => new GetAllTransactionService(transactionRepository),
        inject: [TransactionRepository]
    },
];
