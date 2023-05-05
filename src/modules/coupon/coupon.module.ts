import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CouponFamily,
  CouponFamilySchema,
} from 'src/entities/coupon.family.model';
import { CouponRespository } from 'src/repositories/coupon.respository';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { Coupon, CouponSchema } from 'src/entities/coupon.model';

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
