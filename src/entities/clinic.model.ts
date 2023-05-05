import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Doctor } from './doctor.model';

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
@Schema()
export class Clinic extends Document {
  @Prop({ required: true })
  clinicName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  })
  email: string;

  @Prop({ type: Date })
  clinicJoinDate: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Doctor' }] })
  doctors: Doctor[];

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);
