import {Module} from '@nestjs/common';
import {ClientsModule} from "@nestjs/microservices";
import {KAFKA_CONFIG} from "./kafka.config";
import {AntiFraudListener} from "@infrastructure/kafka/listeners/anti-fraud.listener";


const LISTENERS = [
    AntiFraudListener
];

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                ...KAFKA_CONFIG,
            },
        ]),
    ],
    providers: LISTENERS,
    exports: [ClientsModule, ...LISTENERS]
})
export class KafkaModule {
}
