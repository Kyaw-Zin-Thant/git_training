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
exports.ClinicService = void 0;
const common_1 = require("@nestjs/common");
const clinic_respository_1 = require("../../repositories/clinic.respository");
let ClinicService = class ClinicService {
    constructor(clinicRespository) {
        this.clinicRespository = clinicRespository;
    }
    async createClinic(createClinicDto, session) {
        return await this.clinicRespository.createClinic(createClinicDto, session);
    }
    async getClinics(getQueryDto) {
        return await this.clinicRespository.getClinics(getQueryDto);
    }
    async getClinicById(id) {
        return await this.clinicRespository.getClinicById(id);
    }
    async updateClinic(id, updtaeClinicDto, session) {
        return await this.clinicRespository.updateClinic(id, updtaeClinicDto, session);
    }
};
ClinicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clinic_respository_1.ClinicRespository])
], ClinicService);
exports.ClinicService = ClinicService;
//# sourceMappingURL=clinic.service.js.map