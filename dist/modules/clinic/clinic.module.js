"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const clinic_controller_1 = require("./clinic.controller");
const clinic_service_1 = require("./clinic.service");
const clinic_respository_1 = require("../../repositories/clinic.respository");
const clinic_model_1 = require("../../entities/clinic.model");
const doctor_model_1 = require("../../entities/doctor.model");
let ClinicModule = class ClinicModule {
};
ClinicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: clinic_model_1.Clinic.name, schema: clinic_model_1.ClinicSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: doctor_model_1.Doctor.name, schema: doctor_model_1.DoctorSchema }]),
        ],
        controllers: [clinic_controller_1.ClinicController],
        providers: [clinic_service_1.ClinicService, clinic_respository_1.ClinicRespository],
        exports: [clinic_service_1.ClinicService, clinic_respository_1.ClinicRespository],
    })
], ClinicModule);
exports.ClinicModule = ClinicModule;
//# sourceMappingURL=clinic.module.js.map