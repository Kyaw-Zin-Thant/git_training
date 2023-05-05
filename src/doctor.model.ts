import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Clinic } from 'src/clinic.model';

@Schema()
export class Doctor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  samaID: string;

  @Prop({ required: true })
  academicTitle: string;

  @Prop({ required: true })
  medicalDegree: string;

  phoneNumber: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Clinic' })
  clinicId: Clinic;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
