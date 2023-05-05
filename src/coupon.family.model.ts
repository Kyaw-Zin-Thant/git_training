import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CouponFamily extends Document {
  @Prop({ required: true })
  programName: string;

  @Prop({ required: true })
  serviceName: string;

  @Prop({ required: true })
  noOfCoupons: number;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CouponFamilySchema = SchemaFactory.createForClass(CouponFamily);
