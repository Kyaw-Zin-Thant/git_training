import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';
import { ClinicRespository } from 'src/repositories/clinic.respository';
import { Clinic, ClinicSchema } from 'src/entities/clinic.model';
import { Doctor, DoctorSchema } from 'src/entities/doctor.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clinic.name, schema: ClinicSchema }]),
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
  ],
  controllers: [ClinicController],
  providers: [ClinicService, ClinicRespository],
  exports: [ClinicService, ClinicRespository],
})
export class ClinicModule {}
