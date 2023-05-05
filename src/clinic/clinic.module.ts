import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicController } from 'src/clinic/clinic.controller';
import { ClinicService } from 'src/clinic/clinic.service';
import { ClinicRespository } from 'src/clinic.respository';
import { Clinic, ClinicSchema } from 'src/clinic.model';
import { Doctor, DoctorSchema } from 'src/doctor.model';

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
