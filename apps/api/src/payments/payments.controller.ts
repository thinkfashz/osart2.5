import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @UseGuards(JwtAuthGuard)
  async createIntent(
    @Body('amount') amount: number,
    @Body('orderId') orderId: string,
    @Req() req: any,
  ) {
    return this.paymentsService.createPaymentIntent(
      amount,
      orderId,
      req.user.email,
    );
  }
}
