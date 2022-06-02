import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import * as joi from 'joi';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    // Used in main.ts
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        RABBIT_MQ_URI: joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: joi.string().required(),
      }),
    }),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
