import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // localhost:4200 (frontend) -> localhost:3000 (backend) = CORS Error
  app.enableCors(); // <- alles erlaubt
  // app.enableCors({
  //   origin: 'http://localhost:4200',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  //   allowedHeaders: 'Content-Type, Accept',
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
