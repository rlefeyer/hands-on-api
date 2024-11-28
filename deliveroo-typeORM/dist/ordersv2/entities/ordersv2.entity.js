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
exports.Ordersv2 = void 0;
const swagger_1 = require("@nestjs/swagger");
const item_entity_1 = require("../../items/entities/item.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Ordersv2 = class Ordersv2 {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Ordersv2 = Ordersv2;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identifiant de la commande' }),
    __metadata("design:type", Number)
], Ordersv2.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, (menu) => menu.id, { cascade: true }),
    (0, swagger_1.ApiProperty)({ description: 'Tableau des items de la commande' }),
    __metadata("design:type", Array)
], Ordersv2.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 109.9, description: 'Prix total de la commande' }),
    __metadata("design:type", Number)
], Ordersv2.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user?.id, { cascade: true }),
    (0, swagger_1.ApiProperty)({ description: 'Utilisateur ayant passé la commande' }),
    __metadata("design:type", user_entity_1.User)
], Ordersv2.prototype, "user", void 0);
exports.Ordersv2 = Ordersv2 = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Ordersv2);
//# sourceMappingURL=ordersv2.entity.js.map