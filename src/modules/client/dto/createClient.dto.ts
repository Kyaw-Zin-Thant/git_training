import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  age: string;

  @IsBoolean()
  pragrancyStatus: boolean;

  @IsNumber()
  noOfChildren: number;

  @IsNumber()
  geastralMonth: number;

  @IsBoolean()
  status: boolean;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  stateId: string;

  @IsString()
  regionId: string;
}
