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
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const restaurants_service_1 = require("./restaurants.service");
const create_restaurant_dto_1 = require("./dto/create-restaurant.dto");
const update_restaurant_dto_1 = require("./dto/update-restaurant.dto");
const restaurant_entity_1 = require("./entities/restaurant.entity");
let RestaurantsController = class RestaurantsController {
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    create(createRestaurantDto) {
        return this.restaurantsService.create(createRestaurantDto);
    }
    findAll() {
        return this.restaurantsService.findAll();
    }
    findOne(id) {
        return this.restaurantsService.findOne(+id);
    }
    update(id, updateRestaurantDto) {
        return this.restaurantsService.update(+id, updateRestaurantDto);
    }
    remove(id) {
        return this.restaurantsService.remove(+id);
    }
};
exports.RestaurantsController = RestaurantsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau restaurant' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Le restaurant a été créé avec succès.',
        type: restaurant_entity_1.Restaurant,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Les données fournies sont incorrectes.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les restaurants' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des restaurants récupérée avec succès.',
        type: [restaurant_entity_1.Restaurant],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un restaurant par ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Restaurant trouvé.',
        type: restaurant_entity_1.Restaurant,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Restaurant non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un restaurant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Le restaurant a été mis à jour avec succès.',
        type: restaurant_entity_1.Restaurant,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Les données fournies sont incorrectes.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Restaurant non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurant_dto_1.UpdateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un restaurant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Le restaurant a été supprimé avec succès.',
        type: restaurant_entity_1.Restaurant,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Restaurant non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "remove", null);
exports.RestaurantsController = RestaurantsController = __decorate([
    (0, swagger_1.ApiTags)('Restaurants'),
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
//# sourceMappingURL=restaurants.controller.js.map