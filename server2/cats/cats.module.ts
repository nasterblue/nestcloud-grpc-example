import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CatsController} from './cats.controller';
import {CatsOrmService} from './cats.orm.service';
import {CatsEntity} from './entities/cats.entity';
import {AppService} from '../app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (appService: AppService) => {
        const database = appService.get('database.postgres', {});
        const config: any = {
          ...database,
          entities: [CatsEntity],
        };
        return config;
      },
      inject: [
        AppService,
      ],
    }),
    TypeOrmModule.forFeature([CatsEntity]),
  ],
  controllers: [
    CatsController,
  ],
  providers: [
    CatsOrmService,
  ],
})
export class CatsModule {
}
