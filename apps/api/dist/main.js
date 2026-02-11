"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), { rawBody: true });
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
        credentials: true,
    });
    const port = process.env.API_PORT || 4000;
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 API running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map