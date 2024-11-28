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
exports.Ordersv2Controller = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ordersv2_service_1 = require("./ordersv2.service");
const create_ordersv2_dto_1 = require("./dto/create-ordersv2.dto");
const update_ordersv2_dto_1 = require("./dto/update-ordersv2.dto");
const item_entity_1 = require("../items/entities/item.entity");
const ordersv2_entity_1 = require("./entities/ordersv2.entity");
let Ordersv2Controller = class Ordersv2Controller {
    constructor(ordersv2Service) {
        this.ordersv2Service = ordersv2Service;
    }
    create(createOrdersv2Dto) {
        return this.ordersv2Service.create(createOrdersv2Dto);
    }
    findAll() {
        return this.ordersv2Service.findAll();
    }
    findOne(id) {
        return this.ordersv2Service.findOne(+id);
    }
    update(id, updateOrdersv2Dto) {
        return this.ordersv2Service.update(+id, updateOrdersv2Dto);
    }
    remove(id) {
        return this.ordersv2Service.remove(+id);
    }
    findItems(id) {
        return this.ordersv2Service.findItems(+id);
    }
};
exports.Ordersv2Controller = Ordersv2Controller;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle commande' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Commande créée avec succès.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Les données fournies sont incorrectes.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Un menu ou un utilisateur n'a pas été trouvé.",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ordersv2_dto_1.CreateOrdersv2Dto]),
    __metadata("design:returntype", void 0)
], Ordersv2Controller.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les commandes' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste de toutes les commandes récupérée avec succès.',
        type: [ordersv2_entity_1.Ordersv2],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Ordersv2Controller.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Récupérer une commande par son ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Commande trouvée.',
        type: ordersv2_entity_1.Ordersv2,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Ordersv2Controller.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une commande' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Commande mise à jour avec succès.',
        type: ordersv2_entity_1.Ordersv2,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Les données fournies sont incorrectes.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Commande ou utilisateur non trouvé.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ordersv2_dto_1.UpdateOrdersv2Dto]),
    __metadata("design:returntype", void 0)
], Ordersv2Controller.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une commande' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Commande supprimée avec succès.',
        type: ordersv2_entity_1.Ordersv2,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Ordersv2Controller.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/items'),
    (0, swagger_1.ApiOperation)({
        summary: "Récupérer les items d'une commande",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Items trouvés.',
        type: [item_entity_1.Item],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Ordersv2Controller.prototype, "findItems", null);
exports.Ordersv2Controller = Ordersv2Controller = __decorate([
    (0, swagger_1.ApiTags)('Commandes'),
    (0, common_1.Controller)({ version: '2', path: 'orders' }),
    __metadata("design:paramtypes", [ordersv2_service_1.Ordersv2Service])
], Ordersv2Controller);
//# sourceMappingURL=ordersv2.controller.js.map