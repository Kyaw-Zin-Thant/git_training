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
exports.CouponController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const getQueryDto_1 = require("../../dto/getQueryDto");
const createCoupon_dto_1 = require("./dto/createCoupon.dto");
const updateCoupon_dto_1 = require("./dto/updateCoupon.dto");
const coupon_service_1 = require("./coupon.service");
const generateCoupon_dto_1 = require("./dto/generateCoupon.dto");
let CouponController = class CouponController {
    constructor(mongoConnection, couponService) {
        this.mongoConnection = mongoConnection;
        this.couponService = couponService;
    }
    async createClient(createCouponDto, res) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newClientUser = await this.couponService.createCoupon(createCouponDto, session);
            await session.commitTransaction();
            newClientUser.userId = newClientUser._id;
            delete newClientUser._id;
            console.log(newClientUser);
            return res.status(common_1.HttpStatus.CREATED).send(newClientUser);
        }
        catch (error) {
            await session.abortTransaction();
            throw new common_1.BadRequestException(error);
        }
        finally {
            session.endSession();
        }
    }
    async getClientUsers(getQueryDto, res) {
        const users = await this.couponService.getCouponFamilys(getQueryDto);
        return res.status(common_1.HttpStatus.OK).send(users);
    }
    async getClientUserById(getQueryDto, id, res) {
        const adminUser = await this.couponService.getCouponFamilyById(id, getQueryDto);
        return res.status(common_1.HttpStatus.OK).send(adminUser);
    }
    async updateClient(updtaeClientDto, res) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const updateClientUser = await this.couponService.updateCoupon(updtaeClientDto, session);
            await session.commitTransaction();
            updateClientUser.userId = updateClientUser._id;
            delete updateClientUser._id;
            return res.status(common_1.HttpStatus.OK).send(updateClientUser);
        }
        catch (error) {
            await session.abortTransaction();
            throw new common_1.BadRequestException(error);
        }
        finally {
            session.endSession();
        }
    }
    async generateCoupon(geneateCouponDto, res) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const updateClientUser = await this.couponService.generateCoupon(geneateCouponDto, session);
            await session.commitTransaction();
            updateClientUser.userId = updateClientUser._id;
            delete updateClientUser._id;
            return res.status(common_1.HttpStatus.OK).send(updateClientUser);
        }
        catch (error) {
            await session.abortTransaction();
            throw new common_1.BadRequestException(error);
        }
        finally {
            session.endSession();
        }
    }
};
__decorate([
    (0, common_1.Post)('/family/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCoupon_dto_1.CreateCouponDto, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "createClient", null);
__decorate([
    (0, common_1.Get)('/family/get'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getQueryDto_1.GetQueryDto, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getClientUsers", null);
__decorate([
    (0, common_1.Get)('/family/get/:couponFamilyId'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('couponFamilyId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getQueryDto_1.GetQueryDto, String, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getClientUserById", null);
__decorate([
    (0, common_1.Put)('/family/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateCoupon_dto_1.UpdateCouponDto, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "updateClient", null);
__decorate([
    (0, common_1.Post)('/generate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generateCoupon_dto_1.GeneateCouponDto, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "generateCoupon", null);
CouponController = __decorate([
    (0, common_1.Controller)('coupon'),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        coupon_service_1.CouponService])
], CouponController);
exports.CouponController = CouponController;
//# sourceMappingURL=coupon.controller.js.map