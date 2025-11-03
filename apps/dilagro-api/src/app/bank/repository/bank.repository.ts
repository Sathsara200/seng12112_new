import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBankDto } from '../dto/create-bank.dto';
import { Bank } from '../schemas/bank.schema';
import { UpdateBankDto } from '../dto/update-bank.dto';


@Injectable()
export class BankRepository {
  constructor(@InjectModel(Bank.name) private readonly bankModel: Model<Bank>) {}

  // Create a new bank
  async create(createBankDto: CreateBankDto) {
  const bank = new this.bankModel(createBankDto);
  const savedBank = await bank.save();
  return { _id: savedBank._id.toString(), name: savedBank.name };
}

  // Get all banks
  async findAll() {
    return this.bankModel.find().exec();
  }

  // Get a single bank by ID
  async findOne(id: string) {
    return this.bankModel.findById(id).exec();
  }

  // Update a bank by ID
  async update(id: string, updateBankDto: UpdateBankDto) {
    return this.bankModel
      .findByIdAndUpdate(id, updateBankDto, { new: true })
      .exec();
  }

  // Remove a bank by ID
  async remove(id: string) {
    return this.bankModel.findByIdAndDelete(id).exec();
  }
}
