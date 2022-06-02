import { AbstractRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
  protected readonly logger = new Logger(Order.name);

  constructor(
    // Incoming params are for OrdersRepository
    @InjectModel(Order.name) orderModel: Model<Order>,
    @InjectConnection() connection: Connection,
  ) {
    // Passing to super is for AbstractRepository
    super(orderModel, connection);
  }
}
