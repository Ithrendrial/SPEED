import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Change this to your desired origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(4000);
=======
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        // origin: 'http://localhost:3000',
        origin: '*',
        credentials:true,
    });

    await app.listen(3001);
>>>>>>> main
}
bootstrap();
