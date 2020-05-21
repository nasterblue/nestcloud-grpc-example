import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestCloud} from '@nestcloud/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppService} from './app.service';

async function bootstrap() {
  const app = NestCloud.create(await NestFactory.create(AppModule));
  const config = app.get(AppService);
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.get('service.port', 3000));

}

bootstrap();
