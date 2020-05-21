import {Controller, Inject} from '@nestjs/common';
import {CatsOrmService} from './cats.orm.service';
import {GrpcMethod} from '@nestjs/microservices';
import {
  CreateCatRequest,
  CreateCatResponse,
  GetCatRequest,
  GetCatResponse,
  ListCatResponse
} from './interfaces/cat.interface';
import {NestCloud} from '@nestcloud/core';

@Controller('cats')
export class CatsController {
  constructor(@Inject(CatsOrmService) private readonly catsService: CatsOrmService) {
  }

  @GrpcMethod('CatService')
  async create(data: CreateCatRequest): Promise<CreateCatResponse> {
    const grpc = `${NestCloud.global.boot.get('service.name')}:${NestCloud.global.boot.get('service.port')}`;
    console.log(`${grpc} get invoked`, new Date().toString());
    const cat = await this.catsService.create(data);
    return {
      cat: cat
    };
  }

  @GrpcMethod('CatService')
  async get(data: GetCatRequest): Promise<GetCatResponse> {
    const grpc = `${NestCloud.global.boot.get('service.name')}:${NestCloud.global.boot.get('service.port')}`;
    console.log(`${grpc} get invoked`, new Date().toString());
    const cat = await this.catsService.findOne(data.name);
    return {
      cat: cat
    };
  }

  @GrpcMethod('CatService')
  async list(): Promise<ListCatResponse> {
    const grpc = `${NestCloud.global.boot.get('service.name')}:${NestCloud.global.boot.get('service.port')}`;
    console.log(`${grpc} get list`, new Date().toString());
    const cats = await this.catsService.findAll();
    return {cats: cats};
  }
}
