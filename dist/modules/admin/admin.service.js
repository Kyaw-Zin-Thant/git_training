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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_respository_1 = require("../../repositories/admin.respository");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync(process.cwd() + '/src/config/jwtRS256.key', 'utf-8');
const bcrypt = require("bcrypt");
let AdminService = class AdminService {
    constructor(adminRespository) {
        this.adminRespository = adminRespository;
    }
    async createAdmin(createAdminDto, session) {
        console.log(JSON.stringify(createAdminDto));
        return await this.adminRespository.createAdmin(createAdminDto, session);
    }
    async loginAdmin(loginAdminDto) {
        const getUser = await this.adminRespository.getAdminByEmail(loginAdminDto.email);
        if (getUser) {
            const token = jwt.sign({
                userId: getUser._id,
                userRole: getUser.userRole,
            }, privateKey, {
                algorithm: 'RS256',
                expiresIn: '1d',
            });
            const result = await bcrypt.compare(loginAdminDto.password, getUser.password);
            console.log(result);
            if (!result)
                throw new common_1.UnauthorizedException('password is wrong');
            return {
                email: getUser.email,
                token,
                userRole: getUser.userRole,
            };
        }
        else {
            throw new common_1.NotFoundException('The Admin with this email does not exist');
        }
    }
    async getAdminUsers(getQueryDto) {
        return await this.adminRespository.getAdminUsers(getQueryDto);
    }
    async getAdminUserById(id) {
        return await this.adminRespository.getAdminUserById(id);
    }
    async updateAdmin(id, updateAdminDto) {
        return await this.adminRespository.updateAdmin(id, updateAdminDto);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_respository_1.AdminRespository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map