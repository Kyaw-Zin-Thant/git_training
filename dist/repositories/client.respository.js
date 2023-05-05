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
exports.ClientRespository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_model_1 = require("../entities/client.model");
let ClientRespository = class ClientRespository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createClient(createClientDto, session) {
        let user = await this.getClientByPhoneNumber(createClientDto.phoneNumber);
        if (user) {
            throw new common_1.ConflictException('Client Already Exists!');
        }
        if (!createClientDto.dateOfBirth) {
            const updatedYear = new Date().getUTCFullYear() - parseInt(createClientDto.age);
            createClientDto.dateOfBirth = new Date(new Date().setUTCFullYear(updatedYear)).toISOString();
        }
        console.log(createClientDto);
        user = new this.userModel({
            name: createClientDto.name,
            phoneNumber: createClientDto.phoneNumber,
            age: createClientDto.age || 0,
            pragrancyStatus: createClientDto.pragrancyStatus || false,
            noOfChildren: createClientDto.noOfChildren || 0,
            geastralMonth: createClientDto.geastralMonth || 0,
            status: createClientDto.status || true,
            dateOfBirth: createClientDto.dateOfBirth || new Date().toISOString(),
            stateId: createClientDto.stateId,
            regionId: createClientDto.regionId,
        });
        try {
            user = await user.save({ session });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error in saving DB', error);
        }
        return user;
    }
    async getClientUsers(query) {
        let page = query.page || 1;
        page = Number(page);
        let limit = query.limit || 10;
        limit = Number(limit);
        const skip = (page - 1) * limit;
        let users;
        try {
            let searchQuery = {
                $match: {},
            };
            let dateRangeQuery = {
                $match: {},
            };
            if (query.startDate && query.endDate) {
                dateRangeQuery = {
                    $match: {
                        createdAt: {
                            $gte: new Date(query.startDate),
                            $lt: new Date(query.endDate),
                        },
                    },
                };
            }
            if (query.search) {
                searchQuery = query.searchColumn
                    ? query.searchColumn == 'name'
                        ? {
                            $match: {
                                $or: [
                                    {
                                        name: {
                                            $regex: query.search,
                                            $options: 'i',
                                        },
                                    },
                                ],
                            },
                        }
                        : {
                            $match: {
                                $or: [
                                    {
                                        phoneNumber: {
                                            $regex: query.search,
                                            $options: 'i',
                                        },
                                    },
                                ],
                            },
                        }
                    : {
                        $match: {
                            $or: [
                                {
                                    name: {
                                        $regex: query.search,
                                        $options: 'i',
                                    },
                                },
                                {
                                    phoneNumber: {
                                        $regex: query.search,
                                        $options: 'i',
                                    },
                                },
                            ],
                        },
                    };
            }
            const result = await this.userModel.aggregate([
                searchQuery,
                dateRangeQuery,
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                },
                {
                    $project: {
                        _id: 0,
                        userId: '$_id',
                        name: 1,
                        phoneNumber: 1,
                        age: 1,
                        pragrancyStatus: 1,
                        noOfChildren: 1,
                        geastralMonth: 1,
                        dateOfBirth: 1,
                        status: {
                            $cond: ['$status', '$status', false],
                        },
                        generateCount: 10,
                        redemeedCount: 2,
                    },
                },
                {
                    $facet: {
                        usreList: [{ $skip: skip }, { $limit: limit }],
                        nTotal: [
                            {
                                $count: 'count',
                            },
                        ],
                    },
                },
            ]);
            let response;
            const { usreList, nTotal } = result[0];
            users = usreList;
            if (users.length > 0) {
                response = {
                    ok: true,
                    data: users,
                    message: 'Get Client Data Success!',
                    page,
                    limit,
                    nTotal: nTotal[0] ? nTotal[0].count : 0,
                };
            }
            else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No Client User Exist',
                    page,
                    limit,
                    nTotal: 0,
                };
            }
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error DB GET', error);
        }
    }
    async getClientUserById(id) {
        let user;
        try {
            user = await this.userModel
                .findById(id, {
                _id: 0,
                userId: '$_id',
                name: 1,
                phoneNumber: 1,
                age: 1,
                pragrancyStatus: 1,
                noOfChildren: 1,
                geastralMonth: 1,
                dateOfBirth: 1,
            })
                .populate({
                path: 'regionId',
                options: { strictPopulate: false },
            })
                .populate({
                path: 'stateId',
                options: { strictPopulate: false },
            })
                .exec();
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.InternalServerErrorException('No Client User With this ID' + id, error);
        }
        if (!user) {
            throw new common_1.NotFoundException('The Client with this id does not exist');
        }
        return user;
    }
    async getClientByPhoneNumber(phoneNumber) {
        let user;
        try {
            user = await this.userModel.findOne({ phoneNumber });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error connecting to MongoDB', error);
        }
        return user;
    }
    async updateClient(id, updtaeClientDto) {
        let user = await this.userModel.findOne({ _id: id });
        try {
            if (user) {
                if (!updtaeClientDto.dateOfBirth) {
                    const updatedYear = new Date().getUTCFullYear() - parseInt(updtaeClientDto.age);
                    updtaeClientDto.dateOfBirth = new Date(new Date().setUTCFullYear(updatedYear)).toISOString();
                }
                const updateClientData = {
                    name: updtaeClientDto.name || user.name,
                    phoneNumber: updtaeClientDto.phoneNumber || user.phoneNumber,
                    age: parseInt(updtaeClientDto.age) || user.age,
                    pragrancyStatus: updtaeClientDto.pragrancyStatus || user.pragrancyStatus,
                    noOfChildren: updtaeClientDto.noOfChildren || user.noOfChildren,
                    geastralMonth: updtaeClientDto.geastralMonth || user.geastralMonth,
                    status: updtaeClientDto.status || user.status,
                    dateOfBirth: updtaeClientDto.dateOfBirth || new Date().toISOString(),
                    stateId: updtaeClientDto.stateId || user.stateId,
                    regionId: updtaeClientDto.regionId || user.regionId,
                };
                user = await this.userModel.findOneAndUpdate({ _id: id }, updateClientData, {
                    upsert: true,
                });
                return user;
            }
            else {
                throw new common_1.NotFoundException('Client does not exist with this id');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error in saving DB', error);
        }
        return user;
    }
};
ClientRespository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(client_model_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClientRespository);
exports.ClientRespository = ClientRespository;
//# sourceMappingURL=client.respository.js.map