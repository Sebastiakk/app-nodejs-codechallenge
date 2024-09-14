import {TransactionStatusEnum} from "@domain/enums/transaction-status.enum";

export class TransactionQuery {

    constructor(
        public id: string,
        public accountExternalIdDebit: string,
        public accountExternalIdCredit: string,
        public transferTypeId: number,
        public value: number,
        public transactionStatus: TransactionStatusEnum,
        public createdAt: Date
    ) {
    }

}
