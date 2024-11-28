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
exports.Item = void 0;
const swagger_1 = require("@nestjs/swagger");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const typeorm_1 = require("typeorm");
let Item = class Item {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Item = Item;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: 1, description: "Identifiant de l'item" }),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, swagger_1.ApiProperty)({ example: 'Pizza Margherita', description: "Nom de l'item" }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Une délicieuse pizza garnie de tomates fraîches et de mozzarella',
        description: "Description de l'item",
    }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    (0, swagger_1.ApiProperty)({
        example: 12.99,
        description: "Prix unitaire de l'item en euros",
    }),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, swagger_1.ApiProperty)({ example: 2, description: "Quantité de l'item commandée" }),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.Restaurant, (restaurant) => restaurant.id, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'restaurantId' }),
    (0, swagger_1.ApiProperty)({
        description: 'Référence au restaurant auquel cet item est associé',
        type: () => restaurant_entity_1.Restaurant,
    }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], Item.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Item.prototype, "restaurantId", void 0);
exports.Item = Item = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Item);
//# sourceMappingURL=item.entity.js.map