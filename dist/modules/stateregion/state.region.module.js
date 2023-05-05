"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateRegionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const state_region_controller_1 = require("./state.region.controller");
const state_region_service_1 = require("./state.region.service");
const stateregion_respository_1 = require("../../repositories/stateregion.respository");
const region_model_1 = require("../../entities/region.model");
const state_model_1 = require("../../entities/state.model");
let StateRegionModule = class StateRegionModule {
};
StateRegionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: region_model_1.Region.name, schema: region_model_1.RegionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: state_model_1.State.name, schema: state_model_1.StateSchema }]),
        ],
        controllers: [state_region_controller_1.StateRegionController],
        providers: [state_region_service_1.StateRegionService, stateregion_respository_1.StateRegionRespository],
        exports: [state_region_service_1.StateRegionService, stateregion_respository_1.StateRegionRespository],
    })
], StateRegionModule);
exports.StateRegionModule = StateRegionModule;
//# sourceMappingURL=state.region.module.js.map