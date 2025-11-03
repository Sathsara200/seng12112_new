import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../schemas/customer.schema';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';


@Injectable()
export class CustomerRepository {
  constructor(@InjectModel(Customer.name) private readonly customerModel: Model<Customer>) {}

  // Create a new customer
  async create(createCustomerDto: CreateCustomerDto) {
  const customer = new this.customerModel(createCustomerDto);
  return await customer.save(); // returns the full document
}


  // Get all customers
  async findAll() {
    return this.customerModel.find().exec();
  }

  // Get a single customer by ID
  async findOne(id: string) {
    return this.customerModel.findById(id).exec();
  }

  // Update a customer by ID
  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();
  }

  // Remove a customer by ID
  async remove(id: string) {
    return this.customerModel.findByIdAndDelete(id).exec();
  }
}
