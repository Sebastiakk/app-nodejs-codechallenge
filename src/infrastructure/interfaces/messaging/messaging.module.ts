import {Module} from '@nestjs/common';
import {TransactionsMessaging} from "./transactions.messaging";

@Module({
    controllers: [
        TransactionsMessaging
    ],
})
export class MessagingModule {
}
