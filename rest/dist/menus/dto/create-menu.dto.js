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
exports.CreateMenuDto = void 0;
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateMenuDto {
}
exports.CreateMenuDto = CreateMenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the menu' }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the menu', required: false }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price of the menu' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "prix", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated restaurant', type: () => restaurant_entity_1.Restaurant }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], CreateMenuDto.prototype, "restaurant", void 0);
//# sourceMappingURL=create-menu.dto.js.map