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
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CouponFamily } from './coupon.family.model';
import { Clinic } from './clinic.model';
import { Client } from 'src/entities/client.model';
export declare class Coupon extends Document {
    couponCode: string;
    programName: string;
    serviceName: string;
    couponFamilyId: CouponFamily;
    clinicId: Clinic;
    userId: Client;
    validFrom: Date;
    validTo: Date;
    status: string;
    redemeedDate: Date;
    updatedAt: Date;
    createdAt: Date;
}
export declare const CouponSchema: MongooseSchema<Coupon, import("mongoose").Model<Coupon, any, any, any, Document<unknown, any, Coupon> & Omit<Coupon & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Coupon, Document<unknown, {}, import("mongoose").FlatRecord<Coupon>> & Omit<import("mongoose").FlatRecord<Coupon> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
