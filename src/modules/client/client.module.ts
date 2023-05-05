import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientRespository } from 'src/repositories/client.respository';
import { Client, ClientSchema } from 'src/entities/client.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRespository],
  exports: [ClientService, ClientRespository],
})
export class ClientModule {}
