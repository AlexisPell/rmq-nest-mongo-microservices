import { OrdersRepository } from './orders.repository';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  createOrder(orderDto: CreateOrderDto) {
    this.ordersRepository.create(orderDto);
  }

  getOrders() {
    return this.ordersRepository.find({});
  }
}
