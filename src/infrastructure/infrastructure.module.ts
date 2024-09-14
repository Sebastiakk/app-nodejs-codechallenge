import {Global, Module} from '@nestjs/common';
import {KafkaModule} from "./kafka/kafka.module";
import {HttpModule} from "./interfaces/http/http.module";
import {MessagingModule} from "./interfaces/messaging/messaging.module";
import {DatabaseModule} from "./database/database.module";
import {TRANSACTION_BEAN} from "@infrastructure/bean/transaction.bean";
import {ANTI_FRAUD_BEAN} from "@infrastructure/bean/anti-fraud.bean";

const INFRASTRUCTURE_MODULES = [
    KafkaModule,
    HttpModule,
    MessagingModule,
    DatabaseModule
];

const BEAN_PROVIDERS = [
    ...TRANSACTION_BEAN,
    ...ANTI_FRAUD_BEAN
];

@Global()
@Module({
    providers: BEAN_PROVIDERS,
    imports: INFRASTRUCTURE_MODULES,
    exports: [
        ...INFRASTRUCTURE_MODULES,
        ...BEAN_PROVIDERS
    ]
})
export class InfrastructureModule {
}
