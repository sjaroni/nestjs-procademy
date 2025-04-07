import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // erlaubt nur die Felder, die im DTO definiert sind
    forbidNonWhitelisted: true, // erlaubt nur die Felder, die im DTO definiert sind
    transform: true // konvertiert die Daten in den Typ, der im DTO definiert ist
    // transformOptions: {
    //   enableImplicitConversion: true,
    // },
    // skipMissingProperties: false,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
