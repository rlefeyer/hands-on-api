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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMenuDto {
}
exports.CreateMenuDto = CreateMenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pizza Margherita',
        description: 'Le nom du plat au menu',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le nom du menu est obligatoire.' }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Une délicieuse pizza garnie de tomates fraîches et de mozzarella',
        description: 'Une brève description du plat au menu',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La description du menu est obligatoire.' }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15.99,
        description: 'Le prix du plat en euros',
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Le prix doit être un nombre.' }),
    (0, class_validator_1.IsPositive)({ message: 'Le prix doit être positif.' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "L'ID du restaurant auquel appartient ce menu",
    }),
    (0, class_validator_1.IsNumber)({}, { message: "L'ID du restaurant doit être un nombre." }),
    (0, class_validator_1.IsPositive)({ message: "L'ID du restaurant doit être un nombre positif." }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "restaurantId", void 0);
//# sourceMappingURL=create-menu.dto.js.map