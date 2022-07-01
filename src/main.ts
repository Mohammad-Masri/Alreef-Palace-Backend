import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { GLOBAL_URL_PREFIX, SERVER_PORT } from './config/server_constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_URL_PREFIX);

  const swagger_document = new DocumentBuilder()
    .setTitle('AlReef Palace API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const swagger_document_module = SwaggerModule.createDocument(
    app,
    swagger_document,
    {
      include: [AuthenticationModule],
    },
  );

  SwaggerModule.setup(
    `${GLOBAL_URL_PREFIX}/api-docs`,
    app,
    swagger_document_module,
  );

  await app.listen(SERVER_PORT).finally(() => {
    console.log(`server running in: http://localhost:${SERVER_PORT}`);
    console.log(
      `you can see swagger docs in: http://localhost:${SERVER_PORT}${GLOBAL_URL_PREFIX}/api-docs`,
    );
  });
}
bootstrap();
