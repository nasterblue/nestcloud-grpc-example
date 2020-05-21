import {Module} from '@nestjs/common';
import {BOOT, CONSUL} from '@nestcloud/common';
import {BootModule} from '@nestcloud/boot';
import {ConsulModule} from '@nestcloud/consul';
import {ServiceModule} from '@nestcloud/service';
import {LoadbalanceModule} from '@nestcloud/loadbalance';
import {AppController} from './app.controller';
import {CatsModule} from './cats/cats.module';
import * as path from 'path';
import {AppService} from './app.service';

@Module({
  imports: [
    BootModule.forRoot({
      filePath: path.resolve(__dirname, 'config.yaml'),
    }),
    ConsulModule.forRootAsync({inject: [BOOT]}),
    ServiceModule.forRootAsync({inject: [BOOT, CONSUL]}),
    LoadbalanceModule.forRootAsync({inject: [BOOT]}),
    CatsModule
  ],
  controllers: [],
  providers: [
    AppService
  ]
})
export class AppModule {
}
