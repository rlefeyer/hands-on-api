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
exports.CreateRestaurantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRestaurantDto {
}
exports.CreateRestaurantDto = CreateRestaurantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Le Gourmet',
        description: 'Le nom du restaurant',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le nom du restaurant ne peut pas être vide.' }),
    (0, class_validator_1.MaxLength)(100, {
        message: 'Le nom du restaurant ne peut pas dépasser 100 caractères.',
    }),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Un restaurant gastronomique au cœur de la ville',
        description: 'Une description du restaurant',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500, {
        message: 'La description du restaurant ne peut pas dépasser 500 caractères.',
    }),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123 Rue de Paris, 75001 Paris',
        description: "L'adresse du restaurant",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "L'adresse du restaurant ne peut pas être vide." }),
    (0, class_validator_1.MaxLength)(255, { message: "L'adresse ne peut pas dépasser 255 caractères." }),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Gastronomie française',
        description: 'La catégorie du restaurant',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La catégorie du restaurant ne peut pas être vide.' }),
    (0, class_validator_1.MaxLength)(100, {
        message: 'La catégorie du restaurant ne peut pas dépasser 100 caractères.',
    }),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 4.5,
        description: 'La note du restaurant sur une échelle de 1 à 5',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1, { message: 'La note minimale est 1.' }),
    (0, class_validator_1.Max)(5, { message: 'La note maximale est 5.' }),
    __metadata("design:type", Number)
], CreateRestaurantDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '10:00 - 22:00',
        description: "Les horaires d'ouverture du restaurant",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Les horaires d'ouverture ne peuvent pas être vides.",
    }),
    (0, class_validator_1.MaxLength)(100, {
        message: 'Les horaires ne peuvent pas dépasser 100 caractères.',
    }),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "hours", void 0);
//# sourceMappingURL=create-restaurant.dto.js.map