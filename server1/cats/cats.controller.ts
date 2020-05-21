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
import {AppService} from '../app.service';

@Controller()
export class CatsController {
  constructor(@Inject(CatsOrmService) private readonly catsService: CatsOrmService,
              @Inject(AppService) private appService: AppService) {
  }

  @GrpcMethod('CatService')
  async create(data: CreateCatRequest): Promise<CreateCatResponse> {
    const grpc = `${this.appService.get('service.name', null)}:${this.appService.get('service.port', null)}`;
    console.log(`${grpc} get invoked`, new Date().toString());
    const cat = await this.catsService.create(data);
    return {
      cat: cat
    };
  }

  @GrpcMethod('CatService')
  async get(data: GetCatRequest): Promise<GetCatResponse> {
    const grpc = `${this.appService.get('service.name', null)}:${this.appService.get('service.port', null)}`;
    console.log(`${grpc} get invoked`, new Date().toString());
    const cat = await this.catsService.findOne(data.name);
    return {
      cat: cat
    };
  }

  @GrpcMethod('CatService')
  async list(): Promise<ListCatResponse> {
    const grpc = `${this.appService.get('service.name', null)}:${this.appService.get('service.port', null)}`;
    console.log(`${grpc} get list`, new Date().toString());
    const cats = await this.catsService.findAll();
    return {cats: cats};
  }
}
