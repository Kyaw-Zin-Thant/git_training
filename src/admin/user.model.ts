import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

enum Role {
  'NORMAL',
  'SUPER',
  'ADMIN',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: String, enum: Role })
  userRole: number;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
