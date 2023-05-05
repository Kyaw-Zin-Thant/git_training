import { Response } from 'express';
import { Connection } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { UpdateCouponDto } from './dto/updateCoupon.dto';
import { CouponService } from './coupon.service';
import { GeneateCouponDto } from './dto/generateCoupon.dto';
export declare class CouponController {
    private readonly mongoConnection;
    private couponService;
    constructor(mongoConnection: Connection, couponService: CouponService);
    createClient(createCouponDto: CreateCouponDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getClientUsers(getQueryDto: GetQueryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getClientUserById(getQueryDto: GetQueryDto, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateClient(updtaeClientDto: UpdateCouponDto, res: Response): Promise<Response<any, Record<string, any>>>;
    generateCoupon(geneateCouponDto: GeneateCouponDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
