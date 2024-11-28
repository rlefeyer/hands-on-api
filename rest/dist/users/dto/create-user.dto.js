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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: 'Name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(30, { message: 'Name must be at most 30 characters long' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9\s]*$/, {
        message: 'Name must contain only letters, numbers and spaces',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: 'Address must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Address must be at most 100 characters long' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(10, {
        message: 'Phone number must be at least 10 characters long',
    }),
    (0, class_validator_1.MaxLength)(15, { message: 'Phone number must be at most 15 characters long' }),
    (0, class_validator_1.IsMobilePhone)('fr-FR'),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
//# sourceMappingURL=create-user.dto.js.map