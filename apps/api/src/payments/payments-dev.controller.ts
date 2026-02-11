import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';

@Controller('payments/dev')
export class PaymentsDevController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('simulate-success')
  async simulateSuccess(@Body('orderId') orderId: string) {
    if (!orderId) {
      throw new BadRequestException('orderId is required');
    }

    console.log(`🧪 SIMULATION: Payment success for order ${orderId}`);

    try {
      await this.ordersService.updateStatusInternal(orderId, 'paid');

      return {
        success: true,
        message: `Order ${orderId} marked as paid (SIMULATION)`,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Simulation error:', error);
      throw new BadRequestException(
        `Could not update order ${orderId}: ${error.message}`,
      );
    }
  }
}
