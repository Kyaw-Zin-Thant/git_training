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
exports.ClinicRespository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const clinic_model_1 = require("../entities/clinic.model");
const doctor_model_1 = require("../entities/doctor.model");
let ClinicRespository = class ClinicRespository {
    constructor(clinicModel, doctorModel) {
        this.clinicModel = clinicModel;
        this.doctorModel = doctorModel;
    }
    async createClinic(createClinicDto, session) {
        let clinic = await this.getClinicByPhoneNumber(createClinicDto.phoneNumber);
        if (clinic) {
            throw new common_1.ConflictException('Clinic Already Exists!');
        }
        clinic = new this.clinicModel({
            clinicName: createClinicDto.clinicName,
            phoneNumber: createClinicDto.phoneNumber,
            email: createClinicDto.email || '',
            clinicJoinDate: createClinicDto.clinicJoinDate || new Date(),
            status: createClinicDto.status || true,
        });
        try {
            clinic = await clinic.save({ session });
            const doctors = await Promise.all(createClinicDto.doctors.map(async (d) => {
                const doc = await this.createDoctor(d, session, clinic._id);
                console.log('Done create doc');
                return doc._id;
            }));
            clinic = await this.clinicModel.findOneAndUpdate({ _id: clinic._id }, { doctors: doctors || [] }, { upsert: true });
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return clinic;
    }
    async getClinics(query) {
        let page = query.page || 1;
        page = Number(page);
        let limit = query.limit || 10;
        limit = Number(limit);
        const skip = (page - 1) * limit;
        let clinics;
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
                    ? query.searchColumn == 'clinicName'
                        ? {
                            $match: {
                                $or: [
                                    {
                                        clinicName: {
                                            $regex: query.search,
                                            $options: 'i',
                                        },
                                    },
                                ],
                            },
                        }
                        : query.searchColumn == 'phoneNumber'
                            ? {
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
                                    clinicName: {
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
            const result = await this.clinicModel.aggregate([
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
                        clinicId: '$_id',
                        clinicName: 1,
                        phoneNumber: 1,
                        email: 1,
                        clinicJoinDate: 1,
                        doctors: 1,
                        status: {
                            $cond: ['$status', '$status', true],
                        },
                    },
                },
                {
                    $facet: {
                        clinicList: [{ $skip: skip }, { $limit: limit }],
                        nTotal: [
                            {
                                $count: 'count',
                            },
                        ],
                    },
                },
            ]);
            let response;
            const { clinicList, nTotal } = result[0];
            clinics = clinicList;
            if (clinics.length > 0) {
                response = {
                    ok: true,
                    data: clinics,
                    message: 'Get Clinic Data Success!',
                    page,
                    limit,
                    nTotal: nTotal[0] ? nTotal[0].count : 0,
                };
            }
            else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No Clinic Exist',
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
    async getClinicById(id) {
        let clinic;
        try {
            clinic = await this.clinicModel
                .findById(id, {
                _id: 0,
                clinicId: '$_id',
                clinicName: 1,
                phoneNumber: 1,
                email: 1,
                clinicJoinDate: 1,
                doctors: 1,
            })
                .populate('doctors')
                .exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('No Client User With this ID' + id, error);
        }
        if (!clinic) {
            throw new common_1.NotFoundException('The Clinic with this id does not exist');
        }
        return clinic;
    }
    async getClinicByPhoneNumber(phoneNumber) {
        let clinic;
        try {
            clinic = await this.clinicModel.findOne({ phoneNumber });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error connecting to MongoDB', error);
        }
        return clinic;
    }
    async updateClinic(id, updtaeClinicDto, session) {
        let clinic = await this.getClinicByPhoneNumber(updtaeClinicDto.phoneNumber);
        const doctors = await Promise.all(updtaeClinicDto.doctors.map(async (d) => {
            const doc = await this.createDoctor(d, session, id);
            return doc._id;
        }));
        const updateClinicData = {
            clinicName: updtaeClinicDto.clinicName || clinic.clinicName,
            phoneNumber: updtaeClinicDto.phoneNumber || clinic.phoneNumber,
            email: updtaeClinicDto.email || clinic.email,
            clinicJoinDate: new Date(updtaeClinicDto.clinicJoinDate) || clinic.clinicJoinDate,
            doctors: doctors || clinic.doctors,
            status: updtaeClinicDto.status || clinic.status,
        };
        try {
            clinic = await this.clinicModel.findOneAndUpdate({ _id: id }, updateClinicData, { upsert: true });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error in saving DB', error);
        }
        return clinic;
    }
    async createDoctor(createDoctorDto, session, clinicId) {
        let doctor = await this.doctorModel.findOne({
            samaID: createDoctorDto.samaId,
            clinicId: clinicId,
        });
        try {
            const doctorModel = {
                name: createDoctorDto.name,
                samaID: createDoctorDto.samaId,
                gender: createDoctorDto.gender,
                academicTitle: createDoctorDto.academicTitle,
                medicalDegree: createDoctorDto.medicalDegree,
                phoneNumber: createDoctorDto.phoneNumber,
                clinicId: clinicId,
                status: createDoctorDto.status || true,
            };
            if (!doctor) {
                doctor = new this.doctorModel(doctorModel);
                doctor = await doctor.save({ session });
            }
            else {
                doctor = await this.doctorModel.findByIdAndUpdate(doctor._id, doctorModel, { upsert: true });
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error in saving DB', error);
        }
        return doctor;
    }
};
ClinicRespository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(clinic_model_1.Clinic.name)),
    __param(1, (0, mongoose_1.InjectModel)(doctor_model_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ClinicRespository);
exports.ClinicRespository = ClinicRespository;
//# sourceMappingURL=clinic.respository.js.map