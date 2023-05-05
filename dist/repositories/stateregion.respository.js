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
exports.StateRegionRespository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const region_model_1 = require("../entities/region.model");
const mongoose_2 = require("mongoose");
const state_model_1 = require("../entities/state.model");
const fs = require("fs");
let StateRegionRespository = class StateRegionRespository {
    constructor(regionModel, stateModel) {
        this.regionModel = regionModel;
        this.stateModel = stateModel;
    }
    async getRegions(query) {
        let page = query.page || 1;
        page = Number(page);
        let limit = query.limit || 10;
        limit = Number(limit);
        const skip = (page - 1) * limit;
        let regions;
        try {
            regions = await this.regionModel.aggregate([
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                },
                {
                    $project: {
                        _id: 0,
                        regionId: '$_id',
                        regionName: 1,
                        status: 1,
                    },
                },
            ]);
            let response;
            if (regions.length > 0) {
                response = {
                    ok: true,
                    data: regions,
                    message: 'Get Region Data Success!',
                    page,
                    limit,
                };
            }
            else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No Region Exist',
                    page,
                    limit,
                };
            }
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error DB GET', error);
        }
    }
    async getStates(query, id) {
        let page = query.page || 1;
        page = Number(page);
        let limit = query.limit || 10;
        limit = Number(limit);
        const skip = (page - 1) * limit;
        let states;
        try {
            console.log(id);
            states = await this.stateModel.aggregate([
                {
                    $match: {
                        region: new mongoose_2.Types.ObjectId(id),
                    },
                },
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                },
                {
                    $project: {
                        _id: 0,
                        stateId: '$_id',
                        stateName: 1,
                        status: 1,
                    },
                },
            ]);
            let response;
            if (states.length > 0) {
                response = {
                    ok: true,
                    data: states,
                    message: 'Get State Data Success!',
                    page,
                    limit,
                };
            }
            else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No State Exist',
                    page,
                    limit,
                };
            }
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error DB GET', error);
        }
    }
    async createStateRegions() {
        let data = fs.readFileSync(process.cwd() + '/db.json', 'utf-8');
        data = JSON.parse(data);
        await Promise.all([
            data.map(async (r) => {
                const region = new this.regionModel({
                    regionName: r.eng,
                });
                await region.save();
                console.log(region);
                const states = await Promise.all(r.districts.map((s) => {
                    return { stateName: s.eng, region: region._id };
                }));
                await this.stateModel.insertMany(states);
            }),
        ]);
    }
};
StateRegionRespository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(region_model_1.Region.name)),
    __param(1, (0, mongoose_1.InjectModel)(state_model_1.State.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], StateRegionRespository);
exports.StateRegionRespository = StateRegionRespository;
//# sourceMappingURL=stateregion.respository.js.map