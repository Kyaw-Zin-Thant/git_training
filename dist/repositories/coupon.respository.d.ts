/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ClientSession, Model, Types } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { CreateCouponDto } from 'src/modules/coupon/dto/createCoupon.dto';
import { UpdateCouponDto } from 'src/modules/coupon/dto/updateCoupon.dto';
import { CouponFamily } from 'src/entities/coupon.family.model';
import { GeneateCouponDto } from 'src/modules/coupon/dto/generateCoupon.dto';
import { Coupon } from 'src/entities/coupon.model';
export declare class CouponRespository {
    private readonly couponFamilyModel;
    private readonly couponModel;
    constructor(couponFamilyModel: Model<CouponFamily>, couponModel: Model<Coupon>);
    createCoupon(createCouponDto: CreateCouponDto, session: ClientSession): Promise<any>;
    getCouponFamilys(query: GetQueryDto): Promise<ResponseDto>;
    getCouponFamilyById(id: string, query: GetQueryDto): Promise<ResponseDto>;
    updateCoupon(updtaeCouponDto: UpdateCouponDto, session: ClientSession): Promise<import("mongoose").Document<unknown, {}, CouponFamily> & Omit<CouponFamily & {
        _id: Types.ObjectId;
    }, never>>;
    generateCoupon(geneateCouponDto: GeneateCouponDto, session: ClientSession): Promise<import("mongoose").Document<unknown, {}, Coupon> & Omit<Coupon & {
        _id: Types.ObjectId;
    }, never>>;
}
