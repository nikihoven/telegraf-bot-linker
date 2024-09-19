import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>('PORT', 3000);

  await app.listen(port, () =>
    console.log(`Server has been started on port ${port}`),
  );
}

bootstrap();
