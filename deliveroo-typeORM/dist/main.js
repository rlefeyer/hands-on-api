"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await (await core_1.NestFactory.create(app_module_1.AppModule)).enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
        prefix: 'api/v',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Deliveroo')
        .setDescription("Documentation de l'API Deliveroo")
        .setVersion('0.2')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(':version', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map