import {Controller, Get, Post, Param, Body} from '@nestjs/common';
import {GrpcClient, RpcClient, Service} from '@nestcloud/grpc';
import {CatService} from './interfaces/cat-service.interface';
import {join} from 'path';
import {ListCatResponse} from './interfaces/cat.interface';
import {CreateCatDto} from './dto/create-cat.dto';


const grpcOptions = {
  service: 'rpc-server',
  package: 'cat',
  protoPath: join(__dirname, './interfaces/cat-service.proto'),
};

@Controller()
export class CatsController {
  @RpcClient(grpcOptions)
  private readonly client: GrpcClient;
  @Service('CatService', grpcOptions)
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
}
