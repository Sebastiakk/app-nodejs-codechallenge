import {GenericValidation} from "@domain/validations/generic.validation";
import {TransactionStatusEnum} from "@domain/enums/transaction-status.enum";

export class UpdateStatusTransactionCommand {


    constructor(
        public transactionId: string,
        public status: TransactionStatusEnum,
    ) {
        this.validate();
    }

    private validate() {
        GenericValidation.ensureIsUuid(this.transactionId, 'transactionId');
        GenericValidation.ensureNotNull(this.status, 'status');
    }

}
