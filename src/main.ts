import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {KAFKA_CONFIG} from "@infrastructure/kafka/kafka.config";
import {SwaggerConfig} from "@infrastructure/swagger/swagger.confg";
import {Logger} from "@nestjs/common";
import {env} from "node:process";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    SwaggerConfig.setup(app);

    app.connectMicroservice(KAFKA_CONFIG);

    await app.startAllMicroservices();
    await app.listen(env.APP_PORT);

    Logger.debug(`Aplicacion corriendo en: ${await app.getUrl()}`, bootstrap.name);
}

bootstrap();
