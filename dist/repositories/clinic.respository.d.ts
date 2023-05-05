import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Clinic } from '../entities/clinic.model';
import { CreateClinicDto } from 'src/modules/clinic/dto/createClinic.dto';
import { UpdateClinicDto } from 'src/modules/clinic/dto/updateClinic.dto';
import { Doctor } from 'src/entities/doctor.model';
import { DoctorDto } from 'src/modules/clinic/dto/doctor.dto';
export declare class ClinicRespository {
    private readonly clinicModel;
    private readonly doctorModel;
    constructor(clinicModel: Model<Clinic>, doctorModel: Model<Doctor>);
    createClinic(createClinicDto: CreateClinicDto, session: ClientSession): Promise<Clinic>;
    getClinics(query: GetQueryDto): Promise<ResponseDto>;
    getClinicById(id: MongooseSchema.Types.ObjectId): Promise<any>;
    getClinicByPhoneNumber(phoneNumber: string): Promise<Clinic>;
    updateClinic(id: MongooseSchema.Types.ObjectId, updtaeClinicDto: UpdateClinicDto, session: ClientSession): Promise<Clinic>;
    createDoctor(createDoctorDto: DoctorDto, session: ClientSession, clinicId: MongooseSchema.Types.ObjectId): Promise<Doctor>;
}
