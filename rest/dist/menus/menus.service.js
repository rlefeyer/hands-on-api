"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let MenusService = class MenusService {
    constructor() {
        this.menus = [];
    }
    create(createMenuDto) {
        const newMenu = {
            id: (0, uuid_1.v4)(),
            ...createMenuDto,
        };
        this.menus.push(newMenu);
        return newMenu;
    }
    findAll() {
        return this.menus;
    }
    findOne(id) {
        const menu = this.menus.find((menu) => menu.id === id);
        if (!menu) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        return menu;
    }
    update(id, updateMenuDto) {
        const menuIndex = this.menus.findIndex((menu) => menu.id === id);
        if (menuIndex === -1) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        this.menus[menuIndex] = { ...this.menus[menuIndex], ...updateMenuDto };
        return this.menus[menuIndex];
    }
    remove(id) {
        const menuIndex = this.menus.findIndex((menu) => menu.id === id);
        if (menuIndex === -1) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        this.menus.splice(menuIndex, 1);
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)()
], MenusService);
//# sourceMappingURL=menus.service.js.map