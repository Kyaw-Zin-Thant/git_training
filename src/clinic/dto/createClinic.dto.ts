import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsBoolean,
} from 'class-validator';

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  clinicJoinDate: string;

  @IsString()
  @IsNotEmpty()
  clinicName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @ArrayNotEmpty()
  doctors: [];

  @IsBoolean()
  status: boolean;
}
