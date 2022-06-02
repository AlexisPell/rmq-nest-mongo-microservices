import { Controller } from '@nestjs/common';
import { BillingService } from './billing.service';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { events, RmqService } from '@app/common';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(events.order_created)
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    // If .bill() is fine and ! error
    // then we will take acknowledge the message and it will be taken off the queue
    // (!!!) But it works in wrong way xD
    // this.rmqService.ack(context);
  }
}
