import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateClinicDto } from './dto/createClinic.dto';
import { UpdateClinicDto } from './dto/updateClinic.dto';
import { ClinicService } from './clinic.service';
export declare class ClinicController {
    private readonly mongoConnection;
    private clinicService;
    constructor(mongoConnection: Connection, clinicService: ClinicService);
    createClinic(createClinicDto: CreateClinicDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getClinics(getQueryDto: GetQueryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getClinicById(id: MongooseSchema.Types.ObjectId, res: Response): Promise<Response<any, Record<string, any>>>;
    updateClinic(id: MongooseSchema.Types.ObjectId, updtaeClinicDto: UpdateClinicDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
