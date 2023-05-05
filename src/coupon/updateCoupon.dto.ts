import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from 'src/coupon/createCoupon.dto';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
