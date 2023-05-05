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
exports.CouponRespository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const coupon_family_model_1 = require("../entities/coupon.family.model");
const coupon_model_1 = require("../entities/coupon.model");
const voucher_codes = require("voucher-code-generator");
let CouponRespository = class CouponRespository {
    constructor(couponFamilyModel, couponModel) {
        this.couponFamilyModel = couponFamilyModel;
        this.couponModel = couponModel;
    }
    async createCoupon(createCouponDto, session) {
        let coupon;
        coupon = new this.couponFamilyModel({
            programName: createCouponDto.programName,
            serviceName: createCouponDto.serviceName,
            noOfCoupons: createCouponDto.noOfCoupons,
        });
        try {
            coupon = await coupon.save({ session });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error in saving DB', error);
        }
        return coupon;
    }
    async getCouponFamilys(query) {
        let page = query.page || 1;
        page = Number(page);
        let limit = query.limit || 10;
        limit = Number(limit);
        const skip = (page - 1) * limit;
        let coupons;
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
                    ? query.searchColumn == 'programName' ||
                        query.searchColumn == 'serviceName'
                        ? {
                            $match: {
                                $or: [
                                    {
                                        programName: {
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
                                        serviceName: {
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
                                    programName: {
                                        $regex: query.search,
                                        $options: 'i',
                                    },
                                },
                                {
                                    serviceName: {
                                        $regex: query.search,
                                        $options: 'i',
                                    },
                                },
                            ],
                        },
                    };
            }
            const result = await this.couponFamilyModel.aggregate([
                searchQuery,
                dateRangeQuery,
                {
                    $project: {
                        _id: 0,
                        couponFamilyId: '$_id',
                        programName: 1,
                        serviceName: 1,
                        noOfCoupons: 1,
                        status: { $cond: ['$status', '$status', false] },
                        redemeedDate: new Date(),
                    },
                },
                {
                    $facet: {
                        couponList: [{ $skip: skip }, { $limit: limit }],
                        nTotal: [
                            {
                                $count: 'count',
                            },
                        ],
                    },
                },
            ]);
            let response;
            const { couponList, nTotal } = result[0];
            coupons = couponList;
            if (coupons.length > 0) {
                response = {
                    ok: true,
                    data: coupons,
                    message: 'Get Coupon Data Success!',
                    page,
                    limit,
                    nTotal: nTotal[0] ? nTotal[0].count : 0,
                };
            }
            else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No Coupon User Exist',
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
    async getCouponFamilyById(id, query) {
        let couponFamily;
        let page = query.page || 1;
        page = Number(page);
        let limit = query.limit || 10;
        limit = Number(limit);
        const skip = (page - 1) * limit;
        try {
            let searchQuery = {
                $match: {},
            };
            if (query.search) {
                searchQuery =
                    query.searchColumn && query.searchColumn == 'programName'
                        ? {
                            $match: {
                                $or: [
                                    {
                                        programName: {
                                            $regex: query.search,
                                            $options: 'i',
                                        },
                                    },
                                ],
                            },
                        }
                        : {
                            $match: {},
                        };
            }
            const result = await this.couponModel.aggregate([
                {
                    $match: {
                        couponFamilyId: new mongoose_2.Types.ObjectId(id),
                    },
                },
                searchQuery,
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                },
                {
                    $lookup: {
                        from: 'clients',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'clients',
                    },
                },
                { $unwind: '$clients' },
                {
                    $project: {
                        _id: 0,
                        couponCode: 1,
                        programName: 1,
                        serviceName: 1,
                        redemeedDate: {
                            $cond: ['$redemeedDate', '$redemeedDate', '-'],
                        },
                        validFrom: 1,
                        validTo: 1,
                        status: 1,
                        client: '$clients',
                        doctor: {
                            userId: '644e888a84ca96489c0aa1ca',
                            name: 'Kyaw Kyaw',
                            samaID: 'MBBS12345',
                        },
                    },
                },
                {
                    $facet: {
                        couponList: [{ $skip: skip }, { $limit: limit }],
                        nTotal: [
                            {
                                $count: 'count',
                            },
                        ],
                    },
                },
            ]);
            let response;
            const { couponList, nTotal } = result[0];
            couponFamily = couponList;
            if (couponFamily.length > 0) {
                response = {
                    ok: true,
                    data: couponFamily,
                    message: 'Get Coupon Data Success!',
                    page,
                    limit,
                    nTotal: nTotal[0] ? nTotal[0].count : 0,
                };
            }
            else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No Coupon User Exist',
                    page,
                    limit,
                    nTotal: 0,
                };
            }
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('No Coupon User With this ID' + id, error);
        }
        if (!couponFamily.length) {
            throw new common_1.NotFoundException('The Coupon with this id does not exist');
        }
    }
    async updateCoupon(updtaeCouponDto, session) {
        let couponFamily = new this.couponFamilyModel({
            programName: updtaeCouponDto.programName,
            serviceName: updtaeCouponDto.serviceName,
            noOfCoupons: updtaeCouponDto.noOfCoupons,
        });
        try {
            couponFamily = await couponFamily.save({ session });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error in saving DB', error);
        }
        return couponFamily;
    }
    async generateCoupon(geneateCouponDto, session) {
        const generatedCode = voucher_codes.generate({
            length: 8,
            count: 1,
        })[0];
        let coupon = new this.couponModel({
            couponCode: generatedCode + '',
            programName: geneateCouponDto.programName,
            serviceName: geneateCouponDto.serviceName,
            clinicId: geneateCouponDto.clinicId,
            couponFamilyId: geneateCouponDto.couponFamilyId,
            validFrom: geneateCouponDto.validFrom,
            validTo: geneateCouponDto.validTo,
            userId: geneateCouponDto.userId,
        });
        try {
            coupon = await coupon.save({ session });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error in saving DB', error);
        }
        return coupon;
    }
};
CouponRespository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(coupon_family_model_1.CouponFamily.name)),
    __param(1, (0, mongoose_1.InjectModel)(coupon_model_1.Coupon.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CouponRespository);
exports.CouponRespository = CouponRespository;
//# sourceMappingURL=coupon.respository.js.map