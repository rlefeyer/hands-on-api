"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
let RestaurantsService = class RestaurantsService {
    constructor() {
        this.restaurant = [];
    }
    create(createRestaurantDto) {
        const newRestaurant = { ...createRestaurantDto };
        this.restaurant.push(newRestaurant);
        return Promise.resolve(newRestaurant);
    }
    findAll() {
        return Promise.resolve(this.restaurant);
    }
    findOne(id) {
        const restaurant = this.restaurant.find(restaurant => restaurant.id === id);
        return Promise.resolve(restaurant);
    }
    update(id, updateRestaurantDto) {
        const restaurant = this.restaurant.find(restaurant => restaurant.id === id);
        if (restaurant) {
            Object.assign(restaurant, updateRestaurantDto);
        }
        return Promise.resolve(restaurant);
    }
    remove(id) {
        this.restaurant = this.restaurant.filter(restaurant => restaurant.id !== id);
        return Promise.resolve();
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)()
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map