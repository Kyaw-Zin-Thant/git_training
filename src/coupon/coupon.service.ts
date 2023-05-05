import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/getQueryDto';
import { CreateCouponDto } from 'src/coupon/createCoupon.dto';
import { UpdateCouponDto } from 'src/coupon/updateCoupon.dto';
import { CouponRespository } from 'src/coupon.respository';
import { GeneateCouponDto } from 'src/coupon/generateCoupon.dto';

@Injectable()
export class CouponService {
  constructor(private readonly clientRespository: CouponRespository) {}

  async createCoupon(createCouponDto: CreateCouponDto, session: ClientSession) {
    return await this.clientRespository.createCoupon(createCouponDto, session);
  }

  async getCouponFamilys(getQueryDto: GetQueryDto) {
    return await this.clientRespository.getCouponFamilys(getQueryDto);
  }

  async getCouponFamilyById(id: string, getQueryDto: GetQueryDto) {
    return await this.clientRespository.getCouponFamilyById(id, getQueryDto);
  }
  async updateCoupon(updtaeCouponDto: UpdateCouponDto, session: ClientSession) {
    return await this.clientRespository.updateCoupon(updtaeCouponDto, session);
  }
  async generateCoupon(
    geneateCouponDto: GeneateCouponDto,
    session: ClientSession,
  ) {
    return await this.clientRespository.generateCoupon(
      geneateCouponDto,
      session,
    );
  }
}
