import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { City } from '../schemas/city.schema';

@Injectable()
export class CityRepository {
  constructor(@InjectModel(City.name) private readonly cityModel: Model<City>) {}

  // Create a new city
  async create(createCityDto: CreateCityDto) {
  const city = new this.cityModel(createCityDto);
  const savedCity = await city.save();
  return { _id: savedCity._id.toString(), name: savedCity.name };
}

  // Get all cities
  async findAll() {
    return this.cityModel.find().exec();
  }

  // Get a single city by ID
  async findOne(id: string) {
    return this.cityModel.findById(id).exec();
  }

  // Update a city by ID
  async update(id: string, updateCityDto: UpdateCityDto) {
    return this.cityModel
      .findByIdAndUpdate(id, updateCityDto, { new: true })
      .exec();
  }

  // Remove a city by ID
  async remove(id: string) {
    return this.cityModel.findByIdAndDelete(id).exec();
  }
}
