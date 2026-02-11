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
exports.StripeWebhooksController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const orders_service_1 = require("../orders/orders.service");
let StripeWebhooksController = class StripeWebhooksController {
    paymentsService;
    ordersService;
    constructor(paymentsService, ordersService) {
        this.paymentsService = paymentsService;
        this.ordersService = ordersService;
    }
    async handleWebhook(sig, req) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!sig) {
            throw new common_1.BadRequestException('Missing stripe-signature');
        }
        if (!endpointSecret) {
            console.error('❌ STRIPE_WEBHOOK_SECRET is not defined');
            throw new common_1.BadRequestException('Webhook secret not configured');
        }
        const payload = req.rawBody;
        try {
            const event = await this.paymentsService.constructEvent(payload, sig, endpointSecret);
            console.log(`🔔 Webhook received: ${event.type}`);
            if (event.type === 'payment_intent.succeeded') {
                const paymentIntent = event.data.object;
                const orderId = paymentIntent.metadata?.orderId;
                if (orderId) {
                    console.log(`✅ Order ${orderId} payment succeeded`);
                    await this.ordersService.updateStatusInternal(orderId, 'paid');
                }
            }
            return { received: true };
        }
        catch (err) {
            console.error(`❌ Webhook Error: ${err.message}`);
            throw new common_1.BadRequestException(`Webhook Error: ${err.message}`);
        }
    }
};
exports.StripeWebhooksController = StripeWebhooksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('stripe-signature')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StripeWebhooksController.prototype, "handleWebhook", null);
exports.StripeWebhooksController = StripeWebhooksController = __decorate([
    (0, common_1.Controller)('webhooks/stripe'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService,
        orders_service_1.OrdersService])
], StripeWebhooksController);
//# sourceMappingURL=webhooks.controller.js.map