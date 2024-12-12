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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const menus_service_1 = require("./menus.service");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const update_menu_dto_1 = require("./dto/update-menu.dto");
let MenusController = class MenusController {
    constructor(menusService) {
        this.menusService = menusService;
    }
    create(createMenuDto) {
        return this.menusService.create(createMenuDto);
    }
    findAll() {
        return this.menusService.findAll();
    }
    findOne(id) {
        return this.menusService.findOne(+id);
    }
    update(id, updateMenuDto) {
        return this.menusService.update(+id, updateMenuDto);
    }
    remove(id) {
        return this.menusService.remove(+id);
    }
};
exports.MenusController = MenusController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau menu', deprecated: true }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Le menu a été créé avec succès.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Les données fournies sont incorrectes.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Le restaurant spécifié n'a pas été trouvé.",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_dto_1.CreateMenuDto]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les menus', deprecated: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des menus récupérée avec succès.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un menu par ID', deprecated: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Menu trouvé.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Menu non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un menu', deprecated: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Le menu a été mis à jour avec succès.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Les données fournies sont incorrectes.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Menu ou restaurant non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_menu_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un menu', deprecated: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Le menu a été supprimé avec succès.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Menu non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "remove", null);
exports.MenusController = MenusController = __decorate([
    (0, swagger_1.ApiTags)('Menus'),
    (0, common_1.Controller)('menus'),
    __metadata("design:paramtypes", [menus_service_1.MenusService])
], MenusController);
//# sourceMappingURL=menus.controller.js.map