import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

 const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API documentation for the Api-Gateway')
    .setVersion('1.0')
    .addTag('gateway')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(3000);

  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
