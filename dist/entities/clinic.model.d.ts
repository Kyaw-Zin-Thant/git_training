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
import { Doctor } from './doctor.model';
export declare class Clinic extends Document {
    clinicName: string;
    phoneNumber: string;
    email: string;
    clinicJoinDate: Date;
    doctors: Doctor[];
    status: boolean;
    updatedAt: Date;
    createdAt: Date;
}
export declare const ClinicSchema: MongooseSchema<Clinic, import("mongoose").Model<Clinic, any, any, any, Document<unknown, any, Clinic> & Omit<Clinic & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Clinic, Document<unknown, {}, import("mongoose").FlatRecord<Clinic>> & Omit<import("mongoose").FlatRecord<Clinic> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
