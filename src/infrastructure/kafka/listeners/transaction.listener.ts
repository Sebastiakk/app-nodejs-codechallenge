import {Inject, Injectable} from "@nestjs/common";
import {ClientKafka} from "@nestjs/microservices";


@Injectable()
export class TransactionListener {

    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
    ) {
    }
}
