import {IAntiFraudRepository} from "@domain/repository/i-anti-fraud.repository";
import {TransactionStatusEnum} from "@domain/enums/transaction-status.enum";

export class TransactionRejectedService {


    constructor(
        private readonly antiFraudRepository: IAntiFraudRepository
    ) {
    }

    async run(transactionId: string): Promise<void> {
        const transactionStatus = TransactionStatusEnum.REJECTED;
        await this.antiFraudRepository.updateTransaction(transactionId, transactionStatus);
    }

}
