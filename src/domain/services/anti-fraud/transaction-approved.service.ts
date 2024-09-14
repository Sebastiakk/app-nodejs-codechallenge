import {IAntiFraudRepository} from "@domain/repository/i-anti-fraud.repository";
import {TransactionStatusEnum} from "@domain/enums/transaction-status.enum";

export class TransactionApprovedService {


    constructor(
        private readonly antiFraudRepository: IAntiFraudRepository
    ) {
    }

    async run(transactionId: string): Promise<void> {
        const transactionStatus = TransactionStatusEnum.APPROVED;
        await this.antiFraudRepository.updateTransaction(transactionId, transactionStatus);
    }

}
