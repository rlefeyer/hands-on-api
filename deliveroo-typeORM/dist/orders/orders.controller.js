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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const menu_entity_1 = require("../menus/entities/menu.entity");
const order_entity_1 = require("./entities/order.entity");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(createOrderDto) {
        return this.ordersService.create(createOrderDto);
    }
    findAll() {
        return this.ordersService.findAll();
    }
    findOne(id) {
        return this.ordersService.findOne(+id);
    }
    update(id, updateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }
    remove(id) {
        return this.ordersService.remove(+id);
    }
    findMenus(id) {
        return this.ordersService.findMenus(+id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle commande', deprecated: true }),
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
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les commandes', deprecated: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste de toutes les commandes récupérée avec succès.',
        type: [order_entity_1.Order],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Récupérer une commande par son ID',
        deprecated: true,
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commande trouvée.', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une commande', deprecated: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Commande mise à jour avec succès.',
        type: order_entity_1.Order,
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
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une commande', deprecated: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Commande supprimée avec succès.',
        type: order_entity_1.Order,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/menus'),
    (0, swagger_1.ApiOperation)({
        summary: "Récupérer les menus d'une commande",
        deprecated: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Menus trouvés.',
        type: [menu_entity_1.Menu],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commande non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findMenus", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map