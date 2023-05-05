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
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { AdminRespository } from '../../repositories/admin.respository';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import { UpdateAdminDto } from 'src/modules/admin/dto/updateAdmin.dto';
export declare class AdminService {
    private readonly adminRespository;
    constructor(adminRespository: AdminRespository);
    createAdmin(createAdminDto: CreateAdminDto, session: ClientSession): Promise<import("mongoose").Document<unknown, {}, import("../../entities/user.model").User> & Omit<import("../../entities/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    loginAdmin(loginAdminDto: LoginAdminDto): Promise<{
        email: any;
        token: any;
        userRole: any;
    }>;
    getAdminUsers(getQueryDto: GetQueryDto): Promise<import("../../dto/response.dto").ResponseDto>;
    getAdminUserById(id: MongooseSchema.Types.ObjectId): Promise<any>;
    updateAdmin(id: MongooseSchema.Types.ObjectId, updateAdminDto: UpdateAdminDto): Promise<any>;
}
