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
const menu_entity_1 = require("../menus/entities/menu.entity");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const order_entity_1 = require("./entities/order.entity");
const orders_service_1 = require("./orders.service");
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
    findAllItems() {
        return this.ordersService.findAllItems();
    }
    findOne(id) {
        return this.ordersService.findOne(id);
    }
    findOneItem(id) {
        return this.ordersService.findOneItem(id);
    }
    update(id, updateOrderDto) {
        return this.ordersService.update(id, updateOrderDto);
    }
    remove(id) {
        return this.ordersService.remove(id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new order',
        description: 'Creates a new order with the given details.',
        deprecated: true,
    }),
    (0, swagger_1.ApiBody)({
        type: create_order_dto_1.CreateOrderDto,
        description: 'Order creation data',
        examples: {
            validOrder: {
                summary: 'A valid order',
                value: {
                    menus: [
                        { menuId: '123e4567-e89b-12d3-a456-426614174002', quantity: 2 },
                        { menuId: '123e4567-e89b-12d3-a456-426614174003', quantity: 1 },
                    ],
                    prix: 29.99,
                    user: {
                        userId: '123e4567-e89b-12d3-a456-426614174000',
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The order has been successfully created.',
        type: order_entity_1.Order,
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174004',
                userId: '123e4567-e89b-12d3-a456-426614174000',
                restaurantId: '123e4567-e89b-12d3-a456-426614174001',
                items: [
                    { menuId: '123e4567-e89b-12d3-a456-426614174002', quantity: 2 },
                    { menuId: '123e4567-e89b-12d3-a456-426614174003', quantity: 1 },
                ],
                totalPrice: 29.99,
                status: 'pending',
                createdAt: '2023-01-01T12:00:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Invalid input data.',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'totalPrice must be a positive number',
                    'items should not be empty',
                ],
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
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all orders',
        description: 'Retrieves all orders.',
        deprecated: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The orders have been successfully retrieved.',
        type: [order_entity_1.Order],
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No orders found.',
        schema: {
            example: {
                statusCode: 404,
                message: 'No orders found',
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('menus'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all order menus',
        description: 'Retrieves all menus from all orders.',
        deprecated: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Menus successfully retrieved',
        schema: {
            example: [
                { menuId: '123e4567-e89b-12d3-a456-426614174002', quantity: 2 },
                { menuId: '123e4567-e89b-12d3-a456-426614174003', quantity: 1 },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No menus found',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAllItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a specific order by id',
        description: 'Retrieves an order by its unique identifier.',
        deprecated: true,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The order has been successfully retrieved.',
        type: order_entity_1.Order,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/menus'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a specific menu from an order',
        description: 'Retrieves a specific menu from an order by its unique identifier.',
        deprecated: true,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The menu has been successfully retrieved.',
        type: menu_entity_1.Menu,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Menu not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOneItem", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update an order',
        description: 'Updates an existing order by its unique identifier.',
        deprecated: true,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The order has been successfully updated.',
        type: order_entity_1.Order,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Invalid input data.',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'totalPrice must be a positive number',
                    'items should not be empty',
                ],
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
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete an order',
        description: 'Deletes an existing order by its unique identifier.',
        deprecated: true,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The order has been successfully deleted.',
        type: order_entity_1.Order,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Invalid input data.',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'totalPrice must be a positive number',
                    'items should not be empty',
                ],
                error: 'Bad Request',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Order not found.',
        schema: {
            example: {
                statusCode: 404,
                message: 'Order not found',
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
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('v1/orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map