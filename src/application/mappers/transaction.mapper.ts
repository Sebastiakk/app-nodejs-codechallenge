import {SaveTransactionDto} from "@application/dto/save-transaction.dto";
import {SaveTransactionCommand} from "@domain/models/command/save-transaction.command";
import {TransactionEntity} from "@infrastructure/database/entities/transaction.entity";
import {TransactionQuery} from "@domain/models/query/transaction.query";
import {UpdateStatusTransactionCommand} from "@domain/models/command/update-status-transaction.command";
import {UpdateTransactionStatusDto} from "@application/dto/update-transaction-status.dto";
import {TransactionListDto} from "@application/dto/transaction-list.dto";

export class TransactionMapper {

    static dtoToCommandCreateTransaction(dto: SaveTransactionDto): SaveTransactionCommand {
        return new SaveTransactionCommand(
            dto.accountExternalIdDebit,
            dto.accountExternalIdCredit,
            dto.transferTypeId,
            dto.value
        )
    }

    static commandToEntityCreateTransaction(command: SaveTransactionCommand): TransactionEntity {
        const entity = new TransactionEntity();
        entity.transactionType = command.transferTypeId;
        entity.value = command.value;
        entity.accountExternalIdDebit = command.accountExternalIdDebit;
        entity.accountExternalIdCredit = command.accountExternalIdCredit;
        entity.transactionStatus = command.status;
        return entity;
    }

    static entityToQueryTransaction(entity: TransactionEntity): TransactionQuery {
        return new TransactionQuery(
            entity.id,
            entity.accountExternalIdDebit,
            entity.accountExternalIdCredit,
            entity.transactionType,
            entity.value,
            entity.transactionStatus,
            entity.createdAt
        )
    }

    static dtoToCommandUpdateTransactionStatus(transaction: UpdateTransactionStatusDto): UpdateStatusTransactionCommand {
        return new UpdateStatusTransactionCommand(
            transaction.transactionId,
            transaction.transactionStatus
        )
    }

    static queryToDtoTransaction(query: TransactionQuery): TransactionListDto {
        const dto = new TransactionListDto();
        dto.transactionExternalId = query.id;
        dto.value = query.value;
        dto.transactionType = {name: query.transferTypeId.toString()};
        dto.transactionStatus = {name: query.transactionStatus};
        dto.createdAt = query.createdAt;
        return dto;
    }
}
