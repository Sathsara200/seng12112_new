import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IOrder } from '@seng12112-new/my-lib'; // Example import path

@Schema()
export class Order implements IOrder {
  @Prop({ type: String, required: true }) customerId: string;
  @Prop({ type: String, required: true }) productId: string;
  @Prop({ type: Number, required: true }) quantity: number;
  @Prop({ type: Number, required: true }) totalPrice: number;
  @Prop({ type: Date, default: Date.now }) orderDate: Date;
  @Prop({ 
    type: String, 
    enum: ['pending', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  }) status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

export const OrderSchema = SchemaFactory.createForClass(Order);
