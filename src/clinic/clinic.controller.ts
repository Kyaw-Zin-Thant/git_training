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
import { GetQueryDto } from '../getQueryDto';
import { CreateClinicDto } from '../clinic/createClinic.dto';
import { UpdateClinicDto } from '../clinic/updateClinic.dto';
import { ClinicService } from '../clinic/clinic.service';

@Controller('clinic')
export class ClinicController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private clinicService: ClinicService,
  ) {}

  @Post('/create')
  async createClinic(
    @Body() createClinicDto: CreateClinicDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      console.log(createClinicDto);

      const newClientUser: any = await this.clinicService.createClinic(
        createClinicDto,
        session,
      );
      await session.commitTransaction();
      newClientUser.userId = newClientUser._id;
      delete newClientUser._id;
      console.log(newClientUser);

      return res.status(HttpStatus.CREATED).send(newClientUser);
    } catch (error) {
      await session.abortTransaction();
      console.log(error.message);

      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @Get('/get')
  async getClinics(@Query() getQueryDto: GetQueryDto, @Res() res: Response) {
    const users: any = await this.clinicService.getClinics(getQueryDto);
    return res.status(HttpStatus.OK).send(users);
  }

  @Get('/get/:clinicId')
  async getClinicById(
    @Param('clinicId') id: MongooseSchema.Types.ObjectId,
    @Res() res: Response,
  ) {
    const adminUser: any = await this.clinicService.getClinicById(id);
    return res.status(HttpStatus.OK).send(adminUser);
  }

  @Put('/update/:clinicId')
  async updateClinic(
    @Param('clinicId') id: MongooseSchema.Types.ObjectId,
    @Body() updtaeClinicDto: UpdateClinicDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const updateClientUser: any = await this.clinicService.updateClinic(
        id,
        updtaeClinicDto,
        session,
      );
      await session.commitTransaction();
      updateClientUser.userId = updateClientUser._id;
      delete updateClientUser._id;
      return res.status(HttpStatus.OK).send(updateClientUser);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }
}
