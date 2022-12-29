import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as env from 'dotenv';
env.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const config = new DocumentBuilder()
  .setTitle('E-Auction API')
  .setDescription('The E-Auction API for Seller and Buyer')
  .setVersion('1.0')
  .addTag('e-auction')
  .addServer('/e-auction/api/v1')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  const port = process.env.port || 4000;
  app.setGlobalPrefix('/e-auction/api/v1');
 //  app.enableCors();
  await app.listen(port);
}
bootstrap();
