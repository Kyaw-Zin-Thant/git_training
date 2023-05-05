import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicDto } from 'src/clinic/createClinic.dto';

export class UpdateClinicDto extends PartialType(CreateClinicDto) {}
