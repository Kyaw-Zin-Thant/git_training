import { Schema as MongooseSchema } from 'mongoose';
export declare class GetQueryDto {
    id: MongooseSchema.Types.ObjectId;
    page?: number;
    limit?: number;
    searchColumn?: string;
    search?: string;
    startDate: string;
    endDate: string;
}
