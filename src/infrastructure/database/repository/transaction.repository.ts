import {Repository} from "typeorm";
import {TransactionEntity} from "@infrastructure/database/entities/transaction.entity";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ITransactionRepository} from "@domain/repository/i-transaction.repository";
import {SaveTransactionCommand} from "@domain/models/command/save-transaction.command";
import {TransactionMapper} from "@application/mappers/transaction.mapper";
import {TransactionQuery} from "@domain/models/query/transaction.query";
import {UpdateStatusTransactionCommand} from "@domain/models/command/update-status-transaction.command";


@Injectable()
export class TransactionRepository implements ITransactionRepository {


    constructor(
        @InjectRepository(TransactionEntity)
        private readonly repository: Repository<TransactionEntity>,
    ) {
    }


    async saveTransaction(transaction: SaveTransactionCommand): Promise<string> {
        const entity = TransactionMapper.commandToEntityCreateTransaction(transaction);
        const result = await this.repository.save(entity);
        return result.id;
    }

    async getTransaction(transactionId: string): Promise<TransactionQuery> {
        const result = await this.repository.findOne({where: {id: transactionId}});
        return TransactionMapper.entityToQueryTransaction(result);
    }

    async getAllTransactions(): Promise<TransactionQuery[]> {
        const result = await this.repository.find();
        return result.map(TransactionMapper.entityToQueryTransaction);
    }

    async updateTransaction(transaction: UpdateStatusTransactionCommand): Promise<boolean> {
        const result = await this.repository.update(transaction.transactionId, {transactionStatus: transaction.status});
        return result.affected > 0;
    }


}
