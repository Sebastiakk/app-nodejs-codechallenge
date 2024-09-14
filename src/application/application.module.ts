import {Global, Module} from '@nestjs/common';
import {TransactionService} from "./services/transaction.service";
import {AntiFraudService} from "@application/services/anti-fraud.service";

const SERVICES = [
    TransactionService,
    AntiFraudService
];

@Global()
@Module({
    providers: SERVICES,
    exports: SERVICES,
})
export class ApplicationModule {
}
