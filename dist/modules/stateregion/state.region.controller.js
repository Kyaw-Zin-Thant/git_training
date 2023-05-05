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
exports.StateRegionController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const getQueryDto_1 = require("../../dto/getQueryDto");
const state_region_service_1 = require("./state.region.service");
let StateRegionController = class StateRegionController {
    constructor(mongoConnection, stateRegionService) {
        this.mongoConnection = mongoConnection;
        this.stateRegionService = stateRegionService;
    }
    async getRegions(getQueryDto, res) {
        const users = await this.stateRegionService.getRegions(getQueryDto);
        return res.status(common_1.HttpStatus.OK).send(users);
    }
    async getStates(id, getQueryDto, res) {
        const users = await this.stateRegionService.getStates(getQueryDto, id);
        return res.status(common_1.HttpStatus.OK).send(users);
    }
};
__decorate([
    (0, common_1.Get)('/get'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getQueryDto_1.GetQueryDto, Object]),
    __metadata("design:returntype", Promise)
], StateRegionController.prototype, "getRegions", null);
__decorate([
    (0, common_1.Get)('/state/:regionId'),
    __param(0, (0, common_1.Param)('regionId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, getQueryDto_1.GetQueryDto, Object]),
    __metadata("design:returntype", Promise)
], StateRegionController.prototype, "getStates", null);
StateRegionController = __decorate([
    (0, common_1.Controller)('region'),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        state_region_service_1.StateRegionService])
], StateRegionController);
exports.StateRegionController = StateRegionController;
//# sourceMappingURL=state.region.controller.js.map