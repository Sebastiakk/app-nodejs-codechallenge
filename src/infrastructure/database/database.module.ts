import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TransactionEntity} from "./entities/transaction.entity";
import {TransactionRepository} from "@infrastructure/database/repository/transaction.repository";


const REPOSITORIES = [
    TransactionRepository
]

const ENTITIES = [
    TransactionEntity
]


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('APP_DB_HOST'),
                port: configService.get<number>('APP_DB_PORT'),
                username: configService.get<string>('APP_DB_USER'),
                password: configService.get<string>('APP_DB_PASSWORD'),
                database: configService.get<string>('APP_DB_NAME'),
                entities: ENTITIES,
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature(ENTITIES),
    ],
    providers: REPOSITORIES,
    exports: [TypeOrmModule, ...REPOSITORIES]
})
export class DatabaseModule {
}
