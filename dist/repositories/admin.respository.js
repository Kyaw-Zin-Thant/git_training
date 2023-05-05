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
exports.AdminRespository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../entities/user.model");
let AdminRespository = class AdminRespository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createAdmin(createAdminDto, session) {
        let user = new this.userModel({
            name: createAdminDto.name,
            email: createAdminDto.email,
            userRole: createAdminDto.userRole,
            password: createAdminDto.password,
            status: createAdminDto.status || true,
        });
        try {
            user = await user.save({ session });
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.InternalServerErrorException('Error in saving DB', error);
        }
        return user;
    }
    async getAdminUsers(query) {
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
                                        email: {
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
                                    email: {
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
                        email: 1,
                        userRole: 1,
                        image: 1,
                        status: {
                            $cond: ['$status', '$status', true],
                        },
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
                    message: 'Get Admin Data Success!',
                    page,
                    limit,
                    nTotal: nTotal[0] ? nTotal[0].count : 0,
                };
            }
            else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No Admin User Exist',
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
    async getAdminUserById(id) {
        let user;
        try {
            user = await this.userModel
                .findById(id, {
                _id: 0,
                userId: '$_id',
                name: 1,
                email: 1,
                userRole: 1,
                image: 1,
                status: 1,
            })
                .exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('No Admin User With this ID' + id, error);
        }
        if (!user) {
            throw new common_1.NotFoundException('The Admin with this id does not exist');
        }
        return user;
    }
    async getAdminByEmail(email) {
        let user;
        try {
            user = await this.userModel.findOne({ email });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error connecting to MongoDB', error);
        }
        return user;
    }
    async updateAdmin(id, updateAdminDto) {
        let user = await this.getAdminUserById(id);
        try {
            if (user) {
                user = {
                    name: updateAdminDto.name || user.name,
                    email: updateAdminDto.email || user.email,
                    userRole: updateAdminDto.userRole || user.userRole,
                    status: updateAdminDto.status || user.status,
                };
                console.log(user);
                user = await this.userModel.findOneAndUpdate({ _id: id }, user, {
                    upsert: true,
                });
                if (updateAdminDto.password) {
                    user.password = updateAdminDto.password;
                    user.save();
                }
            }
            else {
                throw new common_1.NotFoundException('Admin does not exist with this id');
            }
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.InternalServerErrorException('Error in saving DB', error);
        }
        return user;
    }
};
AdminRespository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminRespository);
exports.AdminRespository = AdminRespository;
//# sourceMappingURL=admin.respository.js.map