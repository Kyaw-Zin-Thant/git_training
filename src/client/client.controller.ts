import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/getQueryDto';
import { CreateClientDto } from 'src/client/createClient.dto';
import { UpdateClientDto } from 'src/client/updateClient.dto';
import { ClientService } from 'src/client/client.service';

@Controller('client')
export class ClientController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private clientService: ClientService,
  ) {}

  @Post('/create')
  async createClient(
    @Body() createClientDto: CreateClientDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      console.log(createClientDto);
      const newClientUser: any = await this.clientService.createClient(
        createClientDto,
        session,
      );
      await session.commitTransaction();
      newClientUser.userId = newClientUser._id;
      delete newClientUser._id;
      console.log(newClientUser);

      return res.status(HttpStatus.CREATED).send(newClientUser);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @Get('/get')
  async getClientUsers(
    @Query() getQueryDto: GetQueryDto,
    @Res() res: Response,
  ) {
    const users: any = await this.clientService.getClientUsers(getQueryDto);
    return res.status(HttpStatus.OK).send(users);
  }

  @Get('/get/:userId')
  async getClientUserById(
    @Param('userId') id: MongooseSchema.Types.ObjectId,
    @Res() res: Response,
  ) {
    const adminUser: any = await this.clientService.getClientUserById(id);
    return res.status(HttpStatus.OK).send(adminUser);
  }

  @Get('/get-client-by-phone/:phoneNumber')
  async getClientUserByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
    @Res() res: Response,
  ) {
    const adminUser: any = await this.clientService.getClientUserByPhoneNumber(
      phoneNumber,
    );
    return res.status(HttpStatus.OK).send(adminUser);
  }

  @Put('/update/:userId')
  async updateClient(
    @Param('userId') id: MongooseSchema.Types.ObjectId,
    @Body() updtaeClientDto: UpdateClientDto,
    @Res() res: Response,
  ) {
    try {
      const updateClientUser: any = await this.clientService.updateClient(
        id,
        updtaeClientDto,
      );
      updateClientUser.userId = updateClientUser._id;
      delete updateClientUser._id;
      return res.status(HttpStatus.OK).send(updateClientUser);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
