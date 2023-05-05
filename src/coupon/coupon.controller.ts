import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection } from 'mongoose';
import { GetQueryDto } from 'src/getQueryDto';
import { CreateCouponDto } from 'src/coupon/createCoupon.dto';
import { UpdateCouponDto } from 'src/coupon/updateCoupon.dto';
import { CouponService } from 'src/coupon/coupon.service';
import { GeneateCouponDto } from 'src/coupon/generateCoupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private couponService: CouponService,
  ) {}

  @Post('/family/create')
  async createClient(
    @Body() createCouponDto: CreateCouponDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const newClientUser: any = await this.couponService.createCoupon(
        createCouponDto,
        session,
      );
      await session.commitTransaction();
      newClientUser.userId = newClientUser._id;
      delete newClientUser._id;
      console.log(newClientUser);

      return res.status(HttpStatus.CREATED).send(newClientUser);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @Get('/family/get')
  async getClientUsers(
    @Query() getQueryDto: GetQueryDto,
    @Res() res: Response,
  ) {
    const users: any = await this.couponService.getCouponFamilys(getQueryDto);
    return res.status(HttpStatus.OK).send(users);
  }

  @Get('/family/get/:couponFamilyId')
  async getClientUserById(
    @Query() getQueryDto: GetQueryDto,
    @Param('couponFamilyId') id: string,
    @Res() res: Response,
  ) {
    const adminUser: any = await this.couponService.getCouponFamilyById(
      id,
      getQueryDto,
    );
    return res.status(HttpStatus.OK).send(adminUser);
  }

  @Put('/family/update')
  async updateClient(
    @Body() updtaeClientDto: UpdateCouponDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const updateClientUser: any = await this.couponService.updateCoupon(
        updtaeClientDto,
        session,
      );
      await session.commitTransaction();
      updateClientUser.userId = updateClientUser._id;
      delete updateClientUser._id;
      return res.status(HttpStatus.OK).send(updateClientUser);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }
  @Post('/generate')
  async generateCoupon(
    @Body() geneateCouponDto: GeneateCouponDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const updateClientUser: any = await this.couponService.generateCoupon(
        geneateCouponDto,
        session,
      );
      await session.commitTransaction();
      updateClientUser.userId = updateClientUser._id;
      delete updateClientUser._id;
      return res.status(HttpStatus.OK).send(updateClientUser);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }
}
