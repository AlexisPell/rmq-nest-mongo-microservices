import { RmqService, services } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);

  // Get rmq service instance
  const rmqService = app.get<RmqService>(RmqService);
  // Connect mcrsvs with queue name BILLING
  app.connectMicroservice(rmqService.getOptions(services.BILLING_SERVICE));
  // Starts billing microservice
  await app.startAllMicroservices();

  // We dont need to listen this microservice, cuz it doesnt need to be run anywhere
}
bootstrap();
