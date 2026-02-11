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
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("../payments/payments.service");
const orders_service_1 = require("../orders/orders.service");
let WebhooksController = class WebhooksController {
    paymentsService;
    ordersService;
    constructor(paymentsService, ordersService) {
        this.paymentsService = paymentsService;
        this.ordersService = ordersService;
    }
    async handleStripeWebhook(signature, request) {
        if (!signature) {
            throw new common_1.BadRequestException('Missing stripe-signature');
        }
        const payload = request.rawBody;
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        try {
            const event = await this.paymentsService.constructEvent(payload, signature, webhookSecret);
            if (event.type === 'payment_intent.succeeded') {
                const paymentIntent = event.data.object;
                const orderId = paymentIntent.metadata.orderId;
                console.log(`✅ Payment succeded for order: ${orderId}`);
                await this.ordersService.updateStatusInternal(orderId, 'paid');
            }
            return { received: true };
        }
        catch (err) {
            console.error(`❌ Webhook Error: ${err.message}`);
            throw new common_1.BadRequestException(`Webhook Error: ${err.message}`);
        }
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('stripe-signature')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "handleStripeWebhook", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, common_1.Controller)('webhooks/stripe'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService,
        orders_service_1.OrdersService])
], WebhooksController);
//# sourceMappingURL=webhooks.controller.js.map