import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) { }

  async findOne(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async findAll() {
    return this.prisma.profile.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, data: { fullName?: string; avatarUrl?: string }) {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async getStats(id: string) {
    const profile = await this.findOne(id);
    const totalOrders = await this.prisma.order.count({
      where: { userId: id },
    });
    const totalSpent = await this.prisma.order.aggregate({
      where: { userId: id, status: 'paid' },
      _sum: { total: true },
    });

    return {
      points: profile.knowledgePoints,
      totalOrders,
      totalSpent: Number(totalSpent._sum.total || 0),
    };
  }
}
