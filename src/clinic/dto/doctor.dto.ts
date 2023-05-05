import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class DoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  samaId: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  academicTitle: string;

  @IsString()
  @IsNotEmpty()
  medicalDegree: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsBoolean()
  status: boolean;
}
