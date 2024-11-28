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
exports.CreateItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateItemDto {
}
exports.CreateItemDto = CreateItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pizza Margherita',
        description: "Le nom de l'item (plat ou produit)",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Le nom de l'item est obligatoire." }),
    (0, class_validator_1.MaxLength)(100, {
        message: "Le nom de l'item ne peut pas dépasser 100 caractères.",
    }),
    __metadata("design:type", String)
], CreateItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Une délicieuse pizza garnie de tomates fraîches et de mozzarella',
        description: "Une brève description de l'item",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "La description de l'item est obligatoire." }),
    (0, class_validator_1.MaxLength)(255, {
        message: "La description de l'item ne peut pas dépasser 255 caractères.",
    }),
    __metadata("design:type", String)
], CreateItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15.99,
        description: "Le prix de l'item en euros",
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Le prix doit être un nombre valide.' }),
    (0, class_validator_1.IsPositive)({ message: 'Le prix doit être supérieur à 0.' }),
    __metadata("design:type", Number)
], CreateItemDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'La quantité commandée pour cet item',
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'La quantité doit être un nombre valide.' }),
    (0, class_validator_1.IsPositive)({ message: 'La quantité doit être un nombre positif.' }),
    __metadata("design:type", Number)
], CreateItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: "L'ID du menu auquel cet item est associé (si applicable)",
    }),
    (0, class_validator_1.IsNumber)({}, { message: "L'ID de l'item doit être un nombre valide." }),
    (0, class_validator_1.IsPositive)({ message: "L'ID de l'item doit être un nombre positif." }),
    __metadata("design:type", Number)
], CreateItemDto.prototype, "restaurantId", void 0);
//# sourceMappingURL=create-item.dto.js.map