import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
// import { BILLING_SERVICE } from './constants/services.constants';
import { lastValueFrom } from 'rxjs';
import { services } from '@app/common';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(services.BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(orderDto: CreateOrderDto) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(orderDto, { session });
      // Notify rmq about created order with payload - orderDto
      await lastValueFrom(
        this.billingClient.emit('order_created', { orderDto }),
      );
      // Commit this db transaction and persist db
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
