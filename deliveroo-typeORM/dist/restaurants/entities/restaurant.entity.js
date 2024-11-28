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
exports.Restaurant = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const item_entity_1 = require("../../items/entities/item.entity");
let Restaurant = class Restaurant {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Restaurant = Restaurant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identifiant du restaurant' }),
    __metadata("design:type", Number)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, swagger_1.ApiProperty)({ example: 'Restaurant 1', description: 'Nom du restaurant' }),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Description du restaurant 1',
        description: 'Description du restaurant',
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, swagger_1.ApiProperty)({
        example: '123 rue de Paris',
        description: 'Adresse du restaurant',
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, swagger_1.ApiProperty)({
        example: 'Gastronomie française',
        description: 'Catégorie du restaurant',
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, (item) => item.restaurant, { cascade: true }),
    (0, swagger_1.ApiProperty)({
        type: () => [item_entity_1.Item],
        description: 'Items proposés par le restaurant',
    }),
    __metadata("design:type", Array)
], Restaurant.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 4.5, description: 'Note moyenne du restaurant' }),
    __metadata("design:type", Number)
], Restaurant.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, swagger_1.ApiProperty)({
        example: '08:00-22:00',
        description: "Horaires d'ouverture du restaurant",
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "hours", void 0);
exports.Restaurant = Restaurant = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Restaurant);
//# sourceMappingURL=restaurant.entity.js.map