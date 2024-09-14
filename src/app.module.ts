import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {InfrastructureModule} from "@infrastructure/infrastructure.module";
import {ApplicationModule} from "@application/application.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ApplicationModule,
        InfrastructureModule,
    ],
})
export class AppModule {
}
