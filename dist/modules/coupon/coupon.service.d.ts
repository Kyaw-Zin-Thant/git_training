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
import { ClientSession } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { UpdateCouponDto } from './dto/updateCoupon.dto';
import { CouponRespository } from 'src/repositories/coupon.respository';
import { GeneateCouponDto } from './dto/generateCoupon.dto';
export declare class CouponService {
    private readonly clientRespository;
    constructor(clientRespository: CouponRespository);
    createCoupon(createCouponDto: CreateCouponDto, session: ClientSession): Promise<any>;
    getCouponFamilys(getQueryDto: GetQueryDto): Promise<import("../../dto/response.dto").ResponseDto>;
    getCouponFamilyById(id: string, getQueryDto: GetQueryDto): Promise<import("../../dto/response.dto").ResponseDto>;
    updateCoupon(updtaeCouponDto: UpdateCouponDto, session: ClientSession): Promise<import("mongoose").Document<unknown, {}, import("../../entities/coupon.family.model").CouponFamily> & Omit<import("../../entities/coupon.family.model").CouponFamily & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    generateCoupon(geneateCouponDto: GeneateCouponDto, session: ClientSession): Promise<import("mongoose").Document<unknown, {}, import("../../entities/coupon.model").Coupon> & Omit<import("../../entities/coupon.model").Coupon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
