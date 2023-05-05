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
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Client } from '../entities/client.model';
import { CreateClientDto } from 'src/modules/client/dto/createClient.dto';
import { UpdateClientDto } from 'src/modules/client/dto/updateClient.dto';
export declare class ClientRespository {
    private readonly userModel;
    constructor(userModel: Model<Client>);
    createClient(createClientDto: CreateClientDto, session: ClientSession): Promise<Client>;
    getClientUsers(query: GetQueryDto): Promise<ResponseDto>;
    getClientUserById(id: MongooseSchema.Types.ObjectId): Promise<any>;
    getClientByPhoneNumber(phoneNumber: string): Promise<Client>;
    updateClient(id: MongooseSchema.Types.ObjectId, updtaeClientDto: UpdateClientDto): Promise<import("mongoose").Document<unknown, {}, Client> & Omit<Client & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
