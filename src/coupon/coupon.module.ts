import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CouponFamily,
  CouponFamilySchema,
} from './coupon.family.model';
import { CouponRespository } from './coupon.respository';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { Coupon, CouponSchema } from './coupon.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CouponFamily.name, schema: CouponFamilySchema },
    ]),

    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService, CouponRespository],
  exports: [CouponService, CouponRespository],
})
export class CouponModule {}
