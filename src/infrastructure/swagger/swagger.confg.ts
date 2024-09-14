import {INestApplication, Logger} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {env} from 'node:process';

export class SwaggerConfig {

    static setup(app: INestApplication): void {
        const title = 'Yape API';
        const description = 'Documentación de la API de Yape';
        const version = '1.0.0';
        const path = 'swagger';
        const host = env.APP_HOST;
        const port = env.APP_PORT;

        const config = new DocumentBuilder()
            .setTitle(title)
            .setDescription(description)
            .setVersion(version)
            .build();

        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup(path, app, document);

        Logger.debug(`Swagger activo http://${host}:${port}/${path}/#/`, SwaggerConfig.name);
    }
}

