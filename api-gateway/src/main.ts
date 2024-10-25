import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { rateLimitConfigObject } from './security/configs';
import { ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './interceptors';
import { ErrorFilter } from './filters';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  const cookieSecret = process.env.COOKIE_SECRET;
  app.enableCors();
  app.use(cookieParser(cookieSecret));
  app.use(helmet());
  app.use(rateLimit(rateLimitConfigObject));
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new ErrorFilter(httpAdapterHost));

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

