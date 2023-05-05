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
import { Coupon } from './coupon.model';
import { Region } from 'src/entities/region.model';
import { State } from 'src/entities/state.model';
export declare class Client extends Document {
    name: string;
    phoneNumber: string;
    age: number;
    dateOfBirth: Date;
    pragrancyStatus: boolean;
    noOfChildren: number;
    geastralMonth: number;
    couponFamilyId: Coupon;
    status: boolean;
    regionId: Region;
    stateId: State;
    updatedAt: Date;
    createdAt: Date;
}
export declare const ClientSchema: MongooseSchema<Client, import("mongoose").Model<Client, any, any, any, Document<unknown, any, Client> & Omit<Client & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, Document<unknown, {}, import("mongoose").FlatRecord<Client>> & Omit<import("mongoose").FlatRecord<Client> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;