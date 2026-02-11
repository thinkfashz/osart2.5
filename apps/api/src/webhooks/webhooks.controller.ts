import {
  Controller,
  Post,
  Headers,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { PaymentsService } from '../payments/payments.service';
import { OrdersService } from '../orders/orders.service';
import type { FastifyRequest } from 'fastify';

@Controller('webhooks/stripe')
export class WebhooksController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: FastifyRequest,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature');
    }

    const payload = (request as any).rawBody;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      const event = await this.paymentsService.constructEvent(
        payload,
        signature,
        webhookSecret as string,
      );

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as any;
        const orderId = paymentIntent.metadata.orderId;

        // Update order status assuming system authority
        console.log(`✅ Payment succeded for order: ${orderId}`);
        await this.ordersService.updateStatusInternal(orderId, 'paid');
      }

      return { received: true };
    } catch (err) {
      console.error(`❌ Webhook Error: ${err.message}`);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
  }
}
