import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const PORT = 3334;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(
    PORT, 
    () => console.log(
      `Server connect successfully........
      URL: http://localhost:${PORT}
      __dirname: ${__dirname || 'Not Found'}`)
  );
}
bootstrap();