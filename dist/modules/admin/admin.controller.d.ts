import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import { UpdateAdminDto } from 'src/modules/admin/dto/updateAdmin.dto';
export declare class AdminController {
    private readonly mongoConnection;
    private adminService;
    constructor(mongoConnection: Connection, adminService: AdminService);
    createAdmin(createAdminDto: CreateAdminDto, res: Response): Promise<Response<any, Record<string, any>>>;
    loginAdmin(loginAdminDto: LoginAdminDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAdminUsers(getQueryDto: GetQueryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAdminUserById(id: MongooseSchema.Types.ObjectId, res: Response): Promise<Response<any, Record<string, any>>>;
    updateAdminUserById(id: MongooseSchema.Types.ObjectId, updateAdminDto: UpdateAdminDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
