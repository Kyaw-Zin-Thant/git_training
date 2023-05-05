import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { ClinicRespository } from '../../repositories/clinic.respository';
import { CreateClinicDto } from './dto/createClinic.dto';
import { UpdateClinicDto } from './dto/updateClinic.dto';

@Injectable()
export class ClinicService {
  constructor(private readonly clinicRespository: ClinicRespository) {}

  async createClinic(createClinicDto: CreateClinicDto, session: ClientSession) {
    return await this.clinicRespository.createClinic(createClinicDto, session);
  }

  async getClinics(getQueryDto: GetQueryDto) {
    return await this.clinicRespository.getClinics(getQueryDto);
  }

  async getClinicById(id: MongooseSchema.Types.ObjectId) {
    return await this.clinicRespository.getClinicById(id);
  }
  async updateClinic(
    id: MongooseSchema.Types.ObjectId,
    updtaeClinicDto: UpdateClinicDto,
    session: ClientSession,
  ) {
    return await this.clinicRespository.updateClinic(
      id,
      updtaeClinicDto,
      session,
    );
  }
}
