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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const getQueryDto_1 = require("../../dto/getQueryDto");
const createAdmin_dto_1 = require("./dto/createAdmin.dto");
const admin_service_1 = require("./admin.service");
const loginAdmin_dto_1 = require("./dto/loginAdmin.dto");
const updateAdmin_dto_1 = require("./dto/updateAdmin.dto");
let AdminController = class AdminController {
    constructor(mongoConnection, adminService) {
        this.mongoConnection = mongoConnection;
        this.adminService = adminService;
    }
    async createAdmin(createAdminDto, res) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            createAdminDto.password = 'admin@123';
            const newAdminUser = await this.adminService.createAdmin(createAdminDto, session);
            await session.commitTransaction();
            return res.status(common_1.HttpStatus.CREATED).send(newAdminUser);
        }
        catch (error) {
            await session.abortTransaction();
            throw new common_1.BadRequestException(error);
        }
        finally {
            session.endSession();
        }
    }
    async loginAdmin(loginAdminDto, res) {
        try {
            const loginedAdmin = await this.adminService.loginAdmin(loginAdminDto);
            return res.status(common_1.HttpStatus.OK).send(loginedAdmin);
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.BadRequestException(error);
        }
    }
    async getAdminUsers(getQueryDto, res) {
        const users = await this.adminService.getAdminUsers(getQueryDto);
        return res.status(common_1.HttpStatus.OK).send(users);
    }
    async getAdminUserById(id, res) {
        const adminUser = await this.adminService.getAdminUserById(id);
        return res.status(common_1.HttpStatus.OK).send(adminUser);
    }
    async updateAdminUserById(id, updateAdminDto, res) {
        try {
            const adminUser = await this.adminService.updateAdmin(id, updateAdminDto);
            const { _id: userId, name, email, userRole, image, status, updateAt, createdAt, } = adminUser;
            return res.status(common_1.HttpStatus.OK).send({
                userId,
                name,
                email,
                userRole,
                image,
                status,
                updateAt,
                createdAt,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAdmin_dto_1.CreateAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginAdmin_dto_1.LoginAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Get)('/get'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getQueryDto_1.GetQueryDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminUsers", null);
__decorate([
    (0, common_1.Get)('/get/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Schema.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminUserById", null);
__decorate([
    (0, common_1.Put)('/update/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Schema.Types.ObjectId, updateAdmin_dto_1.UpdateAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdminUserById", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map