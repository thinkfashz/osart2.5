"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUserOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (order.userId !== userId) {
            throw new common_1.ForbiddenException('You can only view your own orders');
        }
        return order;
    }
    async create(data) {
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
    async updateStatus(id, status, userId) {
        const order = await this.findOne(id, userId);
        return this.prisma.order.update({
            where: { id },
            data: { status },
        });
    }
    async updateStatusInternal(id, status) {
        const order = await this.prisma.order.update({
            where: { id },
            data: { status },
        });
        if (status === 'paid' && order.userId) {
            const xpToGrant = Math.floor(Number(order.total) * 10);
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map