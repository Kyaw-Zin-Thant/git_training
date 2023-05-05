import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CouponFamily,
  CouponFamilySchema,
} from 'src/coupon.family.model';
import { CouponRespository } from 'src/coupon.respository';
import { CouponController } from 'src/coupon/coupon.controller';
import { CouponService } from 'src/coupon/coupon.service';
import { Coupon, CouponSchema } from 'src/coupon.model';

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
