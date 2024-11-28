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
exports.CreateOrdersv2Dto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrdersv2Dto {
}
exports.CreateOrdersv2Dto = CreateOrdersv2Dto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2, 3],
        description: 'Les identifiants des items commandés',
    }),
    (0, class_validator_1.IsArray)({
        message: 'Les identifiants des items doivent être dans un tableau.',
    }),
    (0, class_validator_1.ArrayNotEmpty)({
        message: 'Le tableau des identifiants des items ne peut pas être vide.',
    }),
    (0, class_validator_1.IsNumber)({}, { each: true, message: 'Chaque identifiant doit être un nombre valide.' }),
    __metadata("design:type", Array)
], CreateOrdersv2Dto.prototype, "itemIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 45.99,
        description: 'Le prix total de la commande en euros',
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Le prix total doit être un nombre valide.' }),
    (0, class_validator_1.IsPositive)({ message: 'Le prix total doit être supérieur à 0.' }),
    __metadata("design:type", Number)
], CreateOrdersv2Dto.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "L'identifiant de l'utilisateur passant la commande",
    }),
    (0, class_validator_1.IsNumber)({}, { message: "L'identifiant de l'utilisateur doit être un nombre valide." }),
    (0, class_validator_1.IsPositive)({
        message: "L'identifiant de l'utilisateur doit être supérieur à 0.",
    }),
    __metadata("design:type", Number)
], CreateOrdersv2Dto.prototype, "userId", void 0);
//# sourceMappingURL=create-ordersv2.dto.js.map