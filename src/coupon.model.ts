import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CouponFamily } from 'src/coupon.family.model';
import { Clinic } from 'src/clinic.model';
import { Client } from 'src/client.model';
enum Status {
  'ACTIVE',
  'INACTIVE',
  'REDEEMED',
  'CANCEL',
  'EXPIRED',
  'REJECT',
}
@Schema()
export class Coupon extends Document {
  @Prop({ required: true })
  couponCode: string;

  @Prop({ required: true })
  programName: string;

  @Prop({ required: true })
  serviceName: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'CouponFamily' })
  couponFamilyId: CouponFamily;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Clinic' })
  clinicId: Clinic;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client' })
  userId: Client;

  @Prop({ default: Date.now })
  validFrom: Date;

  @Prop({ default: Date.now })
  validTo: Date;

  @Prop({ default: 'ACTIVE', enum: Status })
  status: string;

  @Prop({ type: Date })
  redemeedDate: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
