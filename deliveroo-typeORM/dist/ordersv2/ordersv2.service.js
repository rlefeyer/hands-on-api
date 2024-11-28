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
exports.Ordersv2Service = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ordersv2_entity_1 = require("./entities/ordersv2.entity");
let Ordersv2Service = class Ordersv2Service {
    constructor(ordersv2Repository) {
        this.ordersv2Repository = ordersv2Repository;
    }
    async create(createOrdersv2Dto) {
        const newOrder = this.ordersv2Repository.create(createOrdersv2Dto);
        return await this.ordersv2Repository.save(newOrder);
    }
    async findAll() {
        return await this.ordersv2Repository.find({
            relations: ['items'],
        });
    }
    async findOne(id) {
        const order = await this.ordersv2Repository.findOne({
            where: { id },
            relations: ['items'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Commande avec l'ID ${id} non trouvée.`);
        }
        return order;
    }
    async update(id, updateOrdersv2Dto) {
        const order = await this.findOne(id);
        const updatedOrder = { ...order, ...updateOrdersv2Dto };
        await this.ordersv2Repository.update(id, updatedOrder);
        return this.ordersv2Repository.findOne({
            where: { id },
            relations: ['items'],
        });
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.ordersv2Repository.remove(order);
    }
    async findItems(id) {
        const order = await this.findOne(id);
        return order.items;
    }
};
exports.Ordersv2Service = Ordersv2Service;
exports.Ordersv2Service = Ordersv2Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ordersv2_entity_1.Ordersv2)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], Ordersv2Service);
//# sourceMappingURL=ordersv2.service.js.map