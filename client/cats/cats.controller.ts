import {Controller, Get, Post, Param, Body} from '@nestjs/common';
import {GrpcClient, RpcClient, Service} from '@nestcloud/grpc';
import {CatService} from './interfaces/cat-service.interface';
import {join} from 'path';
import {ListCatResponse} from './interfaces/cat.interface';
import {CreateCatDto, CatBreed} from './dto/create-cat.dto';
import * as faker from 'faker';

const grpcConfig = {
  service: 'rpc-server',
  package: 'cat',
  protoPath: join(__dirname, './interfaces/cat-service.proto'),
};

@Controller('/cats')
export class CatsController {
  @RpcClient(grpcConfig)
  private readonly client: GrpcClient;
  @Service('CatService', grpcConfig)
  private catService: CatService;


  @Get('/findByName/:name')
  async get(@Param('name') name: string): Promise<any> {
    const data = await this.catService.get({name: name}).toPromise();
    console.log('client get invoked', new Date().toString());
    return data;
  }


  @Post('')
  async create(@Body() createCatDto: CreateCatDto): Promise<any> {
    const data = await this.catService.create(createCatDto).toPromise();
    console.log('client get invoked', new Date().toString());
    return data;
  }


  @Get('/')
  async list(): Promise<ListCatResponse> {
    const data = await this.catService.list({}).toPromise();
    console.log('client list invoked', new Date().toString());
    return data;
  }


  @Get('/seedDB/:total')
  async seedDB(@Param('total') total: number): Promise<any> {
    for (let i = 0; i < total; i++) {
      await this.catService.create(this.randomCat()).toPromise();
    }
  }

  private randomCat() {
    return {
      name: faker.name.firstName(),
      age: Math.floor((Math.random() * 10) + 1),
      breed: Math.floor((Math.random() * 10)) % 2 === 0 ? CatBreed.male : CatBreed.female
    };
  }

}
