import {GenericValidation} from "@domain/validations/generic.validation";
import {TransactionStatusEnum} from "@domain/enums/transaction-status.enum";

export class SaveTransactionCommand {

    public status: TransactionStatusEnum = TransactionStatusEnum.PENDING;

    constructor(
        public accountExternalIdDebit: string,
        public accountExternalIdCredit: string,
        public transferTypeId: number,
        public value: number
    ) {
        this.validate();
    }

    private validate() {
        GenericValidation.ensureIsUuid(this.accountExternalIdDebit, 'accountExternalIdDebit');
        GenericValidation.ensureIsUuid(this.accountExternalIdCredit, 'accountExternalIdCredit');
        GenericValidation.ensureIsPositiveInteger(this.transferTypeId, 'transferTypeId');
        GenericValidation.ensureIsPositiveInteger(this.value, 'value');
    }

}
