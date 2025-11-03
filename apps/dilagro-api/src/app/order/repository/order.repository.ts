import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../entities/order.schema';


@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = new this.orderModel(orderData);
    return await order.save();
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order | null> {
    return await this.orderModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Order>): Promise<Order | null> {
    return await this.orderModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async remove(id: string): Promise<Order | null> {
    return await this.orderModel.findByIdAndDelete(id).exec();
  }
}
