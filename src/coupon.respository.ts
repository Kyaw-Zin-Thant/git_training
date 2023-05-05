import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { GetQueryDto } from 'src/getQueryDto';
import { ResponseDto } from 'src/response.dto';
import { CreateCouponDto } from 'src/coupon/createCoupon.dto';
import { UpdateCouponDto } from 'src/coupon/updateCoupon.dto';
import { CouponFamily } from 'src/coupon.family.model';
import { GeneateCouponDto } from 'src/coupon/generateCoupon.dto';
import { Coupon } from 'src/coupon.model';
import * as voucher_codes from 'voucher-code-generator';

export class CouponRespository {
  constructor(
    @InjectModel(CouponFamily.name)
    private readonly couponFamilyModel: Model<CouponFamily>,
    @InjectModel(Coupon.name)
    private readonly couponModel: Model<Coupon>,
  ) {}

  async createCoupon(createCouponDto: CreateCouponDto, session: ClientSession) {
    let coupon;

    coupon = new this.couponFamilyModel({
      programName: createCouponDto.programName,
      serviceName: createCouponDto.serviceName,
      noOfCoupons: createCouponDto.noOfCoupons,
    });

    try {
      coupon = await coupon.save({ session });
    } catch (error) {
      throw new InternalServerErrorException('Error in saving DB', error);
    }

    return coupon;
  }

  async getCouponFamilys(query: GetQueryDto) {
    let page = query.page || 1;
    page = Number(page);

    let limit = query.limit || 10;
    limit = Number(limit);

    const skip = (page - 1) * limit;

    let coupons: CouponFamily[];

    try {
      let searchQuery = {
        $match: {},
      };
      let dateRangeQuery = {
        $match: {},
      };
      if (query.startDate && query.endDate) {
        dateRangeQuery = {
          $match: {
            createdAt: {
              $gte: new Date(query.startDate),
              $lt: new Date(query.endDate),
            },
          },
        };
      }
      if (query.search) {
        searchQuery = query.searchColumn
          ? query.searchColumn == 'programName' ||
            query.searchColumn == 'serviceName'
            ? {
                $match: {
                  $or: [
                    {
                      programName: {
                        $regex: query.search,
                        $options: 'i',
                      },
                    },
                  ],
                },
              }
            : {
                $match: {
                  $or: [
                    {
                      serviceName: {
                        $regex: query.search,
                        $options: 'i',
                      },
                    },
                  ],
                },
              }
          : {
              $match: {
                $or: [
                  {
                    programName: {
                      $regex: query.search,
                      $options: 'i',
                    },
                  },
                  {
                    serviceName: {
                      $regex: query.search,
                      $options: 'i',
                    },
                  },
                ],
              },
            };
      }
      const result = await this.couponFamilyModel.aggregate([
        searchQuery,
        dateRangeQuery,
        {
          $project: {
            _id: 0,
            couponFamilyId: '$_id',
            programName: 1,
            serviceName: 1,
            noOfCoupons: 1,
            status: { $cond: ['$status', '$status', false] },
            redemeedDate: new Date(),
          },
        },
        {
          $facet: {
            couponList: [{ $skip: skip }, { $limit: limit }],
            nTotal: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ]);

      let response: ResponseDto;
      const { couponList, nTotal } = result[0];
      coupons = couponList;
      if (coupons.length > 0) {
        response = {
          ok: true,
          data: coupons,
          message: 'Get Coupon Data Success!',
          page,
          limit,
          nTotal: nTotal[0] ? nTotal[0].count : 0,
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No Coupon User Exist',
          page,
          limit,
          nTotal: 0,
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Error DB GET', error);
    }
  }

  async getCouponFamilyById(id: string, query: GetQueryDto) {
    let couponFamily;
    let page = query.page || 1;
    page = Number(page);

    let limit = query.limit || 10;
    limit = Number(limit);

    const skip = (page - 1) * limit;
    try {
      let searchQuery = {
        $match: {},
      };
      if (query.search) {
        searchQuery =
          query.searchColumn && query.searchColumn == 'programName'
            ? {
                $match: {
                  $or: [
                    {
                      programName: {
                        $regex: query.search,
                        $options: 'i',
                      },
                    },
                  ],
                },
              }
            : {
                $match: {},
              };
      }
      const result = await this.couponModel.aggregate([
        {
          $match: {
            couponFamilyId: new Types.ObjectId(id),
          },
        },
        searchQuery,
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: 'clients',
            localField: 'userId',
            foreignField: '_id',
            as: 'clients',
          },
        },
        { $unwind: '$clients' },
        {
          $project: {
            _id: 0,
            couponCode: 1,
            programName: 1,
            serviceName: 1,
            redemeedDate: {
              $cond: ['$redemeedDate', '$redemeedDate', '-'],
            },
            validFrom: 1,
            validTo: 1,
            status: 1,
            client: '$clients',
            doctor: {
              userId: '644e888a84ca96489c0aa1ca',
              name: 'Kyaw Kyaw',
              samaID: 'MBBS12345',
            },
          },
        },
        {
          $facet: {
            couponList: [{ $skip: skip }, { $limit: limit }],
            nTotal: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ]);

      let response: ResponseDto;
      const { couponList, nTotal } = result[0];
      couponFamily = couponList;
      if (couponFamily.length > 0) {
        response = {
          ok: true,
          data: couponFamily,
          message: 'Get Coupon Data Success!',
          page,
          limit,
          nTotal: nTotal[0] ? nTotal[0].count : 0,
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No Coupon User Exist',
          page,
          limit,
          nTotal: 0,
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'No Coupon User With this ID' + id,
        error,
      );
    }

    if (!couponFamily.length) {
      throw new NotFoundException('The Coupon with this id does not exist');
    }
  }

  async updateCoupon(updtaeCouponDto: UpdateCouponDto, session: ClientSession) {
    let couponFamily = new this.couponFamilyModel({
      programName: updtaeCouponDto.programName,
      serviceName: updtaeCouponDto.serviceName,
      noOfCoupons: updtaeCouponDto.noOfCoupons,
    });

    try {
      couponFamily = await couponFamily.save({ session });
    } catch (error) {
      throw new InternalServerErrorException('Error in saving DB', error);
    }

    return couponFamily;
  }

  async generateCoupon(
    geneateCouponDto: GeneateCouponDto,
    session: ClientSession,
  ) {
    const generatedCode = voucher_codes.generate({
      length: 8,
      count: 1,
    })[0];

    let coupon = new this.couponModel({
      couponCode: generatedCode + '',
      programName: geneateCouponDto.programName,
      serviceName: geneateCouponDto.serviceName,
      clinicId: geneateCouponDto.clinicId,
      couponFamilyId: geneateCouponDto.couponFamilyId,
      validFrom: geneateCouponDto.validFrom,
      validTo: geneateCouponDto.validTo,
      userId: geneateCouponDto.userId,
    });

    try {
      coupon = await coupon.save({ session });
    } catch (error) {
      throw new InternalServerErrorException('Error in saving DB', error);
    }

    return coupon;
  }
}
