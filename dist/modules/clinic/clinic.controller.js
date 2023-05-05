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
exports.ClinicController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const getQueryDto_1 = require("../../dto/getQueryDto");
const createClinic_dto_1 = require("./dto/createClinic.dto");
const updateClinic_dto_1 = require("./dto/updateClinic.dto");
const clinic_service_1 = require("./clinic.service");
let ClinicController = class ClinicController {
    constructor(mongoConnection, clinicService) {
        this.mongoConnection = mongoConnection;
        this.clinicService = clinicService;
    }
    async createClinic(createClinicDto, res) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            console.log(createClinicDto);
            const newClientUser = await this.clinicService.createClinic(createClinicDto, session);
            await session.commitTransaction();
            newClientUser.userId = newClientUser._id;
            delete newClientUser._id;
            console.log(newClientUser);
            return res.status(common_1.HttpStatus.CREATED).send(newClientUser);
        }
        catch (error) {
            await session.abortTransaction();
            console.log(error.message);
            throw new common_1.BadRequestException(error);
        }
        finally {
            session.endSession();
        }
    }
    async getClinics(getQueryDto, res) {
        const users = await this.clinicService.getClinics(getQueryDto);
        return res.status(common_1.HttpStatus.OK).send(users);
    }
    async getClinicById(id, res) {
        const adminUser = await this.clinicService.getClinicById(id);
        return res.status(common_1.HttpStatus.OK).send(adminUser);
    }
    async updateClinic(id, updtaeClinicDto, res) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const updateClientUser = await this.clinicService.updateClinic(id, updtaeClinicDto, session);
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
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createClinic_dto_1.CreateClinicDto, Object]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "createClinic", null);
__decorate([
    (0, common_1.Get)('/get'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getQueryDto_1.GetQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "getClinics", null);
__decorate([
    (0, common_1.Get)('/get/:clinicId'),
    __param(0, (0, common_1.Param)('clinicId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Schema.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "getClinicById", null);
__decorate([
    (0, common_1.Put)('/update/:clinicId'),
    __param(0, (0, common_1.Param)('clinicId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Schema.Types.ObjectId, updateClinic_dto_1.UpdateClinicDto, Object]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "updateClinic", null);
ClinicController = __decorate([
    (0, common_1.Controller)('clinic'),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        clinic_service_1.ClinicService])
], ClinicController);
exports.ClinicController = ClinicController;
//# sourceMappingURL=clinic.controller.js.map