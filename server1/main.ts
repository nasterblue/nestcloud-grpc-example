import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from '@nestjs/microservices';
import {join} from 'path';
import {NestCloud} from '@nestcloud/core';
import {AppService} from './app.service';

async function bootstrap() {
  const app = NestCloud.create(await NestFactory.create(AppModule));
  const config = app.get(AppService);
  await app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${config.get('service.port', null)}`,
      package: 'cat',
      protoPath: join(__dirname, './cats/cat.proto'),
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(null);
}

bootstrap();
