import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/getQueryDto';
import { ClinicRespository } from 'src/clinic.respository';
import { CreateClinicDto } from 'src/clinic/createClinic.dto';
import { UpdateClinicDto } from 'src/clinic/updateClinic.dto';

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
