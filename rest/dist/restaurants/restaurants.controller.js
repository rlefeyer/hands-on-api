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
const create_restaurant_dto_1 = require("./dto/create-restaurant.dto");
const update_restaurant_dto_1 = require("./dto/update-restaurant.dto");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const restaurants_service_1 = require("./restaurants.service");
let RestaurantsController = class RestaurantsController {
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    create(createRestaurantDto) {
        return this.restaurantsService.create(createRestaurantDto);
    }
    findAll(name, adresse) {
        return this.restaurantsService.findAll(name, adresse);
    }
    findOne(id) {
        return this.restaurantsService.findOne(id);
    }
    update(id, updateRestaurantDto) {
        return this.restaurantsService.update(id, updateRestaurantDto);
    }
    remove(id) {
        return this.restaurantsService.remove(id);
    }
};
exports.RestaurantsController = RestaurantsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new restaurant',
        description: 'Creates a new restaurant with the given details.',
    }),
    (0, swagger_1.ApiBody)({
        type: create_restaurant_dto_1.CreateRestaurantDto,
        description: 'Restaurant creation data',
        examples: {
            validRestaurant: {
                summary: 'A valid restaurant',
                value: {
                    name: 'KFC',
                    description: 'KFC is a fast food restaurant',
                    adresse: '12 rue de solferino, Lille, 59000',
                    items: [
                        {
                            name: 'BFF',
                            description: 'Big Fat Burger',
                            price: 10,
                        },
                    ],
                    note: 4.8,
                    horaires: '10:00-22:00',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The restaurant has been successfully created.',
        type: restaurant_entity_1.Restaurant,
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174004',
                name: 'Restaurant 1',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Invalid input data.',
        schema: {
            example: {
                statusCode: 400,
                message: ['name should not be empty'],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error occurred while processing the request.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
                error: 'Internal Server Error',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all restaurants',
        description: 'Retrieves all restaurants. You can filter by name or address.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'name',
        required: false,
        description: 'Filter restaurants by name',
        schema: { type: 'string' },
    }),
    (0, swagger_1.ApiQuery)({
        name: 'adresse',
        required: false,
        description: 'Filter restaurants by address',
        schema: { type: 'string' },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The restaurants have been successfully retrieved.',
        type: [restaurant_entity_1.Restaurant],
        schema: {
            example: [
                {
                    id: '123e4567-e89b-12d3-a456-426614174004',
                    name: 'KFC',
                    description: 'KFC is a fast food restaurant',
                    adresse: '12 rue de solferino, Lille, 59000',
                    items: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174004',
                            name: 'BFF',
                            description: 'Big Fat Burger',
                            price: 10,
                        },
                    ],
                    note: 4.8,
                    horaires: '10:00-22:00',
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No restaurants found.',
        schema: {
            example: {
                statusCode: 404,
                message: 'No restaurants found',
                error: 'Not Found',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error occurred while processing the request.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
                error: 'Internal Server Error',
            },
        },
    }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Param)('adresse')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a restaurant by ID',
        description: 'Retrieves a restaurant by its unique identifier.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The restaurant has been successfully retrieved.',
        type: restaurant_entity_1.Restaurant,
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174004',
                name: 'Restaurant 1',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Restaurant not found.',
        schema: {
            example: {
                statusCode: 404,
                message: 'Restaurant not found',
                error: 'Not Found',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error occurred while processing the request.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
                error: 'Internal Server Error',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a restaurant by ID',
        description: 'Updates a restaurant by its unique identifier.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The restaurant has been successfully updated.',
        type: restaurant_entity_1.Restaurant,
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174004',
                name: 'Updated KFC',
                description: 'KFC is a fast food restaurant',
                adresse: '12 rue de solferino, Lille, 59000',
                items: [
                    {
                        id: '123e4567-e89b-12d3-a456-426614174004',
                        name: 'BFF',
                        price: 10,
                    },
                ],
                note: 4.8,
                horaires: '10:00-22:00',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Restaurant not found.',
        schema: {
            example: {
                statusCode: 404,
                message: 'Restaurant not found',
                error: 'Not Found',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error occurred while processing the request.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
                error: 'Internal Server Error',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurant_dto_1.UpdateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a restaurant by ID',
        description: 'Deletes a restaurant by its unique identifier.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The restaurant has been successfully deleted.',
        schema: {
            example: {
                message: 'Restaurant deleted successfully',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Restaurant not found.',
        schema: {
            example: {
                statusCode: 404,
                message: 'Restaurant not found',
                error: 'Not Found',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error occurred while processing the request.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
                error: 'Internal Server Error',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "remove", null);
exports.RestaurantsController = RestaurantsController = __decorate([
    (0, swagger_1.ApiTags)('restaurants'),
    (0, common_1.Controller)('v1/restaurants'),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
//# sourceMappingURL=restaurants.controller.js.map