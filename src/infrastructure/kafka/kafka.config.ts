import {KafkaOptions, Transport} from "@nestjs/microservices";
import {logLevel} from "@nestjs/microservices/external/kafka.interface";
import {Partitioners} from "kafkajs";
import {env} from "node:process";

export const KAFKA_CONFIG: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            brokers: [env.KAFKA_BROKER || 'localhost:9094'],
            logLevel: logLevel.INFO,
        },
        consumer: {
            groupId: '1-test',
            allowAutoTopicCreation: true,
        },
        producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
        },
    }
};
