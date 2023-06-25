import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { Environment } from "src/common/enum";


export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        const isDevelopment = config.get("NODE_ENV") !== Environment.Production;

        const dbConfig = {
            type: 'postgres',
            host: config.get("POSTGRES_DB_HOST"),
            port: +config.get("POSTGRES_DB_PORT"),
            username: config.get("POSTGRES_USER"),
            password: config.get("POSTGRES_PASSWORD"),
            database: config.get("POSTGRES_DB"),
            autoLoadEntities: true,
            synchronize: isDevelopment,
            logging: config.get("POSTGRES_DB_LOGGING"),
        } as PostgresConnectionOptions;

        return dbConfig;
    },
});