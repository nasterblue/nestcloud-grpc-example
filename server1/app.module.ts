import {Module,Global} from '@nestjs/common';
import {NEST_BOOT, NEST_CONSUL} from '@nestcloud/common';
import {BootModule, InjectBoot} from '@nestcloud/boot';
import {ConsulModule} from '@nestcloud/consul';
import {ServiceModule} from '@nestcloud/service';
import {LoadbalanceModule} from '@nestcloud/loadbalance';
import {AppController} from './app.controller';
import {CatsEntity} from './cats/entities/cats.entity';
import {CatsModule} from './cats/cats.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppService} from './app.service';

@Global()
@Module({
  imports: [
    BootModule.register(__dirname, `config.yaml`),
    ConsulModule.register({dependencies: [NEST_BOOT]}),
    ServiceModule.register({dependencies: [NEST_BOOT, NEST_CONSUL]}),
    LoadbalanceModule.register({dependencies: [NEST_BOOT]}),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
  exports: [
    AppService,
  ],
})
export class AppModule {
}
