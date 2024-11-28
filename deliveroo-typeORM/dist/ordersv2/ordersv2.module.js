"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ordersv2Module = void 0;
const common_1 = require("@nestjs/common");
const ordersv2_service_1 = require("./ordersv2.service");
const ordersv2_controller_1 = require("./ordersv2.controller");
const typeorm_1 = require("@nestjs/typeorm");
const ordersv2_entity_1 = require("./entities/ordersv2.entity");
let Ordersv2Module = class Ordersv2Module {
};
exports.Ordersv2Module = Ordersv2Module;
exports.Ordersv2Module = Ordersv2Module = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ordersv2_entity_1.Ordersv2])],
        controllers: [ordersv2_controller_1.Ordersv2Controller],
        providers: [ordersv2_service_1.Ordersv2Service],
    })
], Ordersv2Module);
//# sourceMappingURL=ordersv2.module.js.map