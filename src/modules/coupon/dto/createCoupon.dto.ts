import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  programName: string;

  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @IsNumber()
  noOfCoupons: number;
}
