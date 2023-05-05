import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { ClinicRespository } from '../../repositories/clinic.respository';
import { CreateClinicDto } from './dto/createClinic.dto';
import { UpdateClinicDto } from './dto/updateClinic.dto';
export declare class ClinicService {
    private readonly clinicRespository;
    constructor(clinicRespository: ClinicRespository);
    createClinic(createClinicDto: CreateClinicDto, session: ClientSession): Promise<import("../../entities/clinic.model").Clinic>;
    getClinics(getQueryDto: GetQueryDto): Promise<import("../../dto/response.dto").ResponseDto>;
    getClinicById(id: MongooseSchema.Types.ObjectId): Promise<any>;
    updateClinic(id: MongooseSchema.Types.ObjectId, updtaeClinicDto: UpdateClinicDto, session: ClientSession): Promise<import("../../entities/clinic.model").Clinic>;
}
