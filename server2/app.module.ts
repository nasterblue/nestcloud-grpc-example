import {Module} from '@nestjs/common';
import {NEST_BOOT, NEST_CONSUL} from '@nestcloud/common';
import {BootModule} from '@nestcloud/boot';
import {ConsulModule} from '@nestcloud/consul';
import {ServiceModule} from '@nestcloud/service';
import {LoadbalanceModule} from '@nestcloud/loadbalance';
import {AppController} from './app.controller';
import {CatsEntity} from './cats/entities/cats.entity';
import {CatsModule} from './cats/cats.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    BootModule.register(__dirname, `config.yaml`),
    ConsulModule.register({dependencies: [NEST_BOOT]}),
    ServiceModule.register({dependencies: [NEST_BOOT, NEST_CONSUL]}),
    LoadbalanceModule.register({dependencies: [NEST_BOOT]}),
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
    CatsModule
  ],
  controllers: [AppController],
})
export class AppModule {
}
