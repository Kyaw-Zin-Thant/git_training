import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';
import { ClientService } from './client.service';
export declare class ClientController {
    private readonly mongoConnection;
    private clientService;
    constructor(mongoConnection: Connection, clientService: ClientService);
    createClient(createClientDto: CreateClientDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getClientUsers(getQueryDto: GetQueryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getClientUserById(id: MongooseSchema.Types.ObjectId, res: Response): Promise<Response<any, Record<string, any>>>;
    getClientUserByPhoneNumber(phoneNumber: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateClient(id: MongooseSchema.Types.ObjectId, updtaeClientDto: UpdateClientDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
