import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CatsController} from './cats.controller';
import {CatsOrmService} from './cats.orm.service';
import {CatsEntity} from './entities/cats.entity';
import {AppService} from '../app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatsEntity]),
  ],
  controllers: [
    CatsController,
  ],
  providers: [
    CatsOrmService,
    AppService
  ],
})
export class CatsModule {
}
