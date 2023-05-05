import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/getQueryDto';
import { ClientRespository } from 'src/client.respository';
import { CreateClientDto } from 'src/client/createClient.dto';
import { UpdateClientDto } from 'src/client/updateClient.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRespository: ClientRespository) {}

  async createClient(createClientDto: CreateClientDto, session: ClientSession) {
    return await this.clientRespository.createClient(createClientDto, session);
  }

  async getClientUsers(getQueryDto: GetQueryDto) {
    return await this.clientRespository.getClientUsers(getQueryDto);
  }

  async getClientUserById(id: MongooseSchema.Types.ObjectId) {
    return await this.clientRespository.getClientUserById(id);
  }
  async getClientUserByPhoneNumber(phoneNumber: string) {
    return await this.clientRespository.getClientByPhoneNumber(phoneNumber);
  }

  async updateClient(
    id: MongooseSchema.Types.ObjectId,
    updtaeClientDto: UpdateClientDto,
  ) {
    return await this.clientRespository.updateClient(id, updtaeClientDto);
  }
}
