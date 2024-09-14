import {Provider} from "@nestjs/common";
import {TransactionRepository} from "@infrastructure/database/repository/transaction.repository";
import {ValidateTransactionService} from "@domain/services/anti-fraud/validate-transaction.service";
import {AntiFraudListener} from "@infrastructure/kafka/listeners/anti-fraud.listener";
import {TransactionApprovedService} from "@domain/services/anti-fraud/transaction-approved.service";
import {TransactionRejectedService} from "@domain/services/anti-fraud/transaction-rejected.service";

export const ANTI_FRAUD_BEAN: Provider[] = [
    {
        provide: ValidateTransactionService,
        useFactory: (transactionRepository, antiFraudRepository) => new ValidateTransactionService(transactionRepository, antiFraudRepository),
        inject: [TransactionRepository, AntiFraudListener]
    },
    {
        provide: TransactionApprovedService,
        useFactory: (antiFraudRepository) => new TransactionApprovedService(antiFraudRepository),
        inject: [AntiFraudListener]
    },
    {
        provide: TransactionRejectedService,
        useFactory: (antiFraudRepository) => new TransactionRejectedService(antiFraudRepository),
        inject: [AntiFraudListener]
    },
];
