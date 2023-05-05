import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class GeneateCouponDto {
  @IsString()
  @IsNotEmpty()
  programName: string;

  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @IsString()
  @IsNotEmpty()
  clinicId: string;

  @IsString()
  @IsNotEmpty()
  couponFamilyId: string;

  @IsDateString()
  @IsNotEmpty()
  validFrom: string;

  @IsDateString()
  @IsNotEmpty()
  validTo: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
