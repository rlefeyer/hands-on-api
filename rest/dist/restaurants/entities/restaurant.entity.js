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
const item_entity_1 = require("../../items/entities/item.entity");
const typeorm_1 = require("typeorm");
let Restaurant = class Restaurant {
};
exports.Restaurant = Restaurant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, (item) => item.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Restaurant.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "horaires", void 0);
exports.Restaurant = Restaurant = __decorate([
    (0, typeorm_1.Entity)()
], Restaurant);
//# sourceMappingURL=restaurant.entity.js.map