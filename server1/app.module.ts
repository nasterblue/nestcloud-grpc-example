import {Module} from '@nestjs/common';
import {BOOT, CONSUL} from '@nestcloud/common';
import {BootModule} from '@nestcloud/boot';
import {ConsulModule} from '@nestcloud/consul';
import {ServiceModule} from '@nestcloud/service';
import {LoadbalanceModule} from '@nestcloud/loadbalance';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsEntity} from './cats/entities/cats.entity';
import {CatsModule} from './cats/cats.module';
import {CatsController} from './cats/cats.controller';
import {CatsOrmService} from './cats/cats.orm.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: [
    BootModule.forRoot({
      filePath: path.resolve(__dirname, 'config.yaml'),
    }),
    ConsulModule.forRootAsync({inject: [BOOT]}),
    ServiceModule.forRootAsync({inject: [BOOT, CONSUL]}),
    LoadbalanceModule.forRootAsync({inject: [BOOT]}),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'nest',
        password: 'nest',
        database: 'nest',
        entities: [CatsEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([CatsEntity]),
    CatsModule
  ],
  controllers: [
    CatsController
  ],
  providers: [
    AppService,
    CatsOrmService,
  ]
})
export class AppModule {
}
