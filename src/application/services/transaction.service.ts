import {Injectable} from "@nestjs/common";
import {SaveTransactionService} from "@domain/services/transaction/save-transaction.service";
import {SaveTransactionDto} from "@application/dto/save-transaction.dto";
import {TransactionMapper} from "@application/mappers/transaction.mapper";
import {UpdateStatusTransactionService} from "@domain/services/transaction/update-status-transaction.service";
import {UpdateTransactionStatusDto} from "@application/dto/update-transaction-status.dto";
import {GetTransactionService} from "@domain/services/transaction/get-transaction.service";
import {TransactionListDto} from "@application/dto/transaction-list.dto";
import {GetAllTransactionService} from "@domain/services/transaction/get-all-transaction.service";


@Injectable()
export class TransactionService {

    constructor(
        private readonly saveTransactionService: SaveTransactionService,
        private readonly updateTransactionStatusService: UpdateStatusTransactionService,
        private readonly getTransactionService: GetTransactionService,
        private readonly getAllTransactionService: GetAllTransactionService
    ) {
    }

    saveTransaction(transaction: SaveTransactionDto): Promise<string> {
        const transactionCommand = TransactionMapper.dtoToCommandCreateTransaction(transaction);
        return this.saveTransactionService.run(transactionCommand);
    }

    updateTransactionStatus(transaction: UpdateTransactionStatusDto): Promise<boolean> {
        const transactionCommand = TransactionMapper.dtoToCommandUpdateTransactionStatus(transaction);
        return this.updateTransactionStatusService.run(transactionCommand);
    }

    async getTransaction(transactionId: string): Promise<TransactionListDto> {
        const query = await this.getTransactionService.run(transactionId);
        return TransactionMapper.queryToDtoTransaction(query);
    }

    async getAllTransactions(): Promise<TransactionListDto[]> {
        const queries = await this.getAllTransactionService.run();
        return queries.map(TransactionMapper.queryToDtoTransaction);
    }

}
