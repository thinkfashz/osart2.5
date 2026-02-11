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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsDevController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("../orders/orders.service");
let PaymentsDevController = class PaymentsDevController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async simulateSuccess(orderId) {
        if (!orderId) {
            throw new common_1.BadRequestException('orderId is required');
        }
        console.log(`🧪 SIMULATION: Payment success for order ${orderId}`);
        try {
            await this.ordersService.updateStatusInternal(orderId, 'paid');
            return {
                success: true,
                message: `Order ${orderId} marked as paid (SIMULATION)`,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            console.error('Simulation error:', error);
            throw new common_1.BadRequestException(`Could not update order ${orderId}: ${error.message}`);
        }
    }
};
exports.PaymentsDevController = PaymentsDevController;
__decorate([
    (0, common_1.Post)('simulate-success'),
    __param(0, (0, common_1.Body)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsDevController.prototype, "simulateSuccess", null);
exports.PaymentsDevController = PaymentsDevController = __decorate([
    (0, common_1.Controller)('payments/dev'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], PaymentsDevController);
//# sourceMappingURL=payments-dev.controller.js.map