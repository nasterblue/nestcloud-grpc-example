import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CatsController} from './cats.controller';
import {CatsOrmService} from './cats.orm.service';
import {CatsEntity} from './entities/cats.entity';
import {ConsulConfig} from '@nestcloud/config';
import {NestCloud} from '@nestcloud/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatsEntity]),
  ],
  controllers: [
    CatsController,
  ],
  providers: [
    CatsOrmService
  ],
})
export class CatsModule {
}
