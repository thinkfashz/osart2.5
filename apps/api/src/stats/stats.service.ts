import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getAdminDashboardStats() {
    const [totalSalesResult, activeUsers, totalInventory, pendingOrders] =
      await Promise.all([
        // Total Sales from paid/delivered orders
        this.prisma.order.aggregate({
          _sum: {
            total: true,
          },
          where: {
            status: {
              in: ['paid', 'delivered', 'shipped'],
            },
          },
        }),
        // Count registered users (profiles)
        this.prisma.profile.count(),
        // Sum inventory stock
        this.prisma.product.aggregate({
          _sum: {
            stock: true,
          },
        }),
        // Count pending orders
        this.prisma.order.count({
          where: {
            status: {
              in: ['pending', 'payment_pending'],
            },
          },
        }),
      ]);

    return {
      totalSales: Number(totalSalesResult._sum.total || 0),
      activeUsers,
      totalInventory: totalInventory._sum.stock || 0,
      pendingOrders,
    };
  }
}
