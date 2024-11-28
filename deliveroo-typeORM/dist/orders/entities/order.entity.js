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
exports.Order = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../users/entities/user.entity");
class Order {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.Order = Order;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identifiant de la commande' }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tableau de menus de la commande' }),
    __metadata("design:type", Array)
], Order.prototype, "menus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 109.9, description: 'Prix total de la commande' }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Utilisateur ayant passé la commande' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
//# sourceMappingURL=order.entity.js.map