import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../getQueryDto';
import { ResponseDto } from '../response.dto';
import { Clinic } from './clinic.model';
import { CreateClinicDto } from './createClinic.dto';
import { UpdateClinicDto } from './updateClinic.dto';
import { Doctor } from './doctor.model';
import { DoctorDto } from './doctor.dto';

export class ClinicRespository {
  constructor(
    @InjectModel(Clinic.name)
    private readonly clinicModel: Model<Clinic>,
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<Doctor>,
  ) {}

  async createClinic(createClinicDto: CreateClinicDto, session: ClientSession) {
    let clinic = await this.getClinicByPhoneNumber(createClinicDto.phoneNumber);

    if (clinic) {
      throw new ConflictException('Clinic Already Exists!');
    }

    clinic = new this.clinicModel({
      clinicName: createClinicDto.clinicName,
      phoneNumber: createClinicDto.phoneNumber,
      email: createClinicDto.email || '',
      clinicJoinDate: createClinicDto.clinicJoinDate || new Date(),
      status: createClinicDto.status || true,
    });

    try {
      clinic = await clinic.save({ session });
      const doctors = await Promise.all(
        createClinicDto.doctors.map(async (d) => {
          const doc = await this.createDoctor(d, session, clinic._id);
          console.log('Done create doc');

          return doc._id;
        }),
      );
      clinic = await this.clinicModel.findOneAndUpdate(
        { _id: clinic._id },
        { doctors: doctors || [] },
        { upsert: true },
      );
    } catch (error) {
      console.log(error.message);

      throw new InternalServerErrorException(error.message);
    }

    return clinic;
  }

  async getClinics(query: GetQueryDto) {
    let page = query.page || 1;
    page = Number(page);

    let limit = query.limit || 10;
    limit = Number(limit);

    const skip = (page - 1) * limit;

    let clinics: Clinic[];

    try {
      let searchQuery = {
        $match: {},
      };
      let dateRangeQuery = {
        $match: {},
      };
      if (query.startDate && query.endDate) {
        dateRangeQuery = {
          $match: {
            createdAt: {
              $gte: new Date(query.startDate),
              $lt: new Date(query.endDate),
            },
          },
        };
      }
      if (query.search) {
        searchQuery = query.searchColumn
          ? query.searchColumn == 'clinicName'
            ? {
                $match: {
                  $or: [
                    {
                      clinicName: {
                        $regex: query.search,
                        $options: 'i',
                      },
                    },
                  ],
                },
              }
            : query.searchColumn == 'phoneNumber'
            ? {
                $match: {
                  $or: [
                    {
                      phoneNumber: {
                        $regex: query.search,
                        $options: 'i',
                      },
                    },
                  ],
                },
              }
            : {
                $match: {
                  $or: [
                    {
                      email: {
                        $regex: query.search,
                        $options: 'i',
                      },
                    },
                  ],
                },
              }
          : {
              $match: {
                $or: [
                  {
                    clinicName: {
                      $regex: query.search,
                      $options: 'i',
                    },
                  },
                  {
                    phoneNumber: {
                      $regex: query.search,
                      $options: 'i',
                    },
                  },
                ],
              },
            };
      }
      const result = await this.clinicModel.aggregate([
        searchQuery,
        dateRangeQuery,
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 0,
            clinicId: '$_id',
            clinicName: 1,
            phoneNumber: 1,
            email: 1,
            clinicJoinDate: 1,
            doctors: 1,
            status: {
              $cond: ['$status', '$status', true],
            },
          },
        },
        {
          $facet: {
            clinicList: [{ $skip: skip }, { $limit: limit }],
            nTotal: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ]);
      let response: ResponseDto;
      const { clinicList, nTotal } = result[0];
      clinics = clinicList;
      if (clinics.length > 0) {
        response = {
          ok: true,
          data: clinics,
          message: 'Get Clinic Data Success!',
          page,
          limit,
          nTotal: nTotal[0] ? nTotal[0].count : 0,
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No Clinic Exist',
          page,
          limit,
          nTotal: 0,
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Error DB GET', error);
    }
  }

  async getClinicById(id: MongooseSchema.Types.ObjectId) {
    let clinic;
    try {
      clinic = await this.clinicModel
        .findById(id, {
          _id: 0,
          clinicId: '$_id',
          clinicName: 1,
          phoneNumber: 1,
          email: 1,
          clinicJoinDate: 1,
          doctors: 1,
        })
        .populate('doctors')
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'No Client User With this ID' + id,
        error,
      );
    }

    if (!clinic) {
      throw new NotFoundException('The Clinic with this id does not exist');
    }

    return clinic;
  }

  async getClinicByPhoneNumber(phoneNumber: string): Promise<Clinic> {
    let clinic;

    try {
      clinic = await this.clinicModel.findOne({ phoneNumber });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error connecting to MongoDB',
        error,
      );
    }

    return clinic;
  }

  async updateClinic(
    id: MongooseSchema.Types.ObjectId,
    updtaeClinicDto: UpdateClinicDto,
    session: ClientSession,
  ) {
    let clinic = await this.getClinicByPhoneNumber(updtaeClinicDto.phoneNumber);

    const doctors = await Promise.all(
      updtaeClinicDto.doctors.map(async (d) => {
        const doc = await this.createDoctor(d, session, id);
        return doc._id;
      }),
    );

    const updateClinicData = {
      clinicName: updtaeClinicDto.clinicName || clinic.clinicName,
      phoneNumber: updtaeClinicDto.phoneNumber || clinic.phoneNumber,
      email: updtaeClinicDto.email || clinic.email,
      clinicJoinDate:
        new Date(updtaeClinicDto.clinicJoinDate) || clinic.clinicJoinDate,
      doctors: doctors || clinic.doctors,
      status: updtaeClinicDto.status || clinic.status,
    };

    try {
      clinic = await this.clinicModel.findOneAndUpdate(
        { _id: id },
        updateClinicData,
        { upsert: true },
      );
    } catch (error) {
      throw new InternalServerErrorException('Error in saving DB', error);
    }

    return clinic;
  }
  async createDoctor(
    createDoctorDto: DoctorDto,
    session: ClientSession,
    clinicId: MongooseSchema.Types.ObjectId,
  ): Promise<Doctor> {
    let doctor = await this.doctorModel.findOne({
      samaID: createDoctorDto.samaId,
      clinicId: clinicId,
    });
    try {
      const doctorModel = {
        name: createDoctorDto.name,
        samaID: createDoctorDto.samaId,
        gender: createDoctorDto.gender,
        academicTitle: createDoctorDto.academicTitle,
        medicalDegree: createDoctorDto.medicalDegree,
        phoneNumber: createDoctorDto.phoneNumber,
        clinicId: clinicId,
        status: createDoctorDto.status || true,
      };
      if (!doctor) {
        doctor = new this.doctorModel(doctorModel);

        doctor = await doctor.save({ session });
      } else {
        doctor = await this.doctorModel.findByIdAndUpdate(
          doctor._id,
          doctorModel,
          { upsert: true },
        );
      }
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error in saving DB', error);
    }
    return doctor;
  }
}
