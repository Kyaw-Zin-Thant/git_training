import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from 'src/client/client.controller';
import { ClientService } from 'src/client/client.service';
import { ClientRespository } from 'src/client.respository';
import { Client, ClientSchema } from 'src/client.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRespository],
  exports: [ClientService, ClientRespository],
})
export class ClientModule {}
