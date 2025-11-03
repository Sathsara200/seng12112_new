import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { IProduct } from '@seng12112-new/my-lib';


@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<IProduct[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    return this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<IProduct | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
