import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('You can only view your own orders');
    }

    return order;
  }

  async create(data: any) {
    const orderNumber = `ORDR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return this.prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        items: data.items,
        status: 'pending',
        orderNumber,
        subtotal: data.total,
      },
    });
  }

  async updateStatus(id: string, status: string, userId: string) {
    const order = await this.findOne(id, userId);

    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async updateStatusInternal(id: string, status: string) {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status },
    });

    // Grant XP (Knowledge Points) if paid
    if (status === 'paid' && order.userId) {
      const xpToGrant = Math.floor(Number(order.total) * 10); // 10 XP per currency unit
      await this.prisma.profile.update({
        where: { id: order.userId },
        data: {
          knowledgePoints: {
            increment: xpToGrant,
          },
        },
      });
    }

    return order;
  }
}
