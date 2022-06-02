import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { DatabaseModule, RmqModule, services } from '@app/common';
import { OrdersRepository } from './orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        MONGODB_URI: joi.string().required(),
        PORT: joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    // Registring billing queue here in orders app
    RmqModule.register({ name: services.BILLING_SERVICE }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
