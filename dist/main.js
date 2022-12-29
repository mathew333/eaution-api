"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const env = require("dotenv");
env.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('E-Auction API')
        .setDescription('The E-Auction API for Seller and Buyer')
        .setVersion('1.0')
        .addTag('e-auction')
        .addServer('/e-auction/api/v1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.port || 4000;
    app.setGlobalPrefix('/e-auction/api/v1');
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map