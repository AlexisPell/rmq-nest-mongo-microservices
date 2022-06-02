import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import {
  Document,
  Schema as MongooseSchema,
  SchemaTypes,
  Types,
} from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true, versionKey: false })
// extends Document
export class Order {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
