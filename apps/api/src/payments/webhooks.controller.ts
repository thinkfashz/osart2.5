import {
  Controller,
  Post,
  Headers,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { OrdersService } from '../orders/orders.service';
import type { FastifyRequest } from 'fastify';

@Controller('webhooks/stripe')
export class StripeWebhooksController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  async handleWebhook(
    @Headers('stripe-signature') sig: string,
    @Req() req: FastifyRequest,
  ) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig) {
      throw new BadRequestException('Missing stripe-signature');
    }

    if (!endpointSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET is not defined');
      throw new BadRequestException('Webhook secret not configured');
    }

    const payload = (req as any).rawBody;

    try {
      const event = await this.paymentsService.constructEvent(
        payload,
        sig,
        endpointSecret,
      );

      console.log(`🔔 Webhook received: ${event.type}`);

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as any;
        const orderId = paymentIntent.metadata?.orderId;

        if (orderId) {
          console.log(`✅ Order ${orderId} payment succeeded`);
          await this.ordersService.updateStatusInternal(orderId, 'paid');
        }
      }

      return { received: true };
    } catch (err) {
      console.error(`❌ Webhook Error: ${err.message}`);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
  }
}
