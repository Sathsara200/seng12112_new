import { Inject, Injectable } from "@nestjs/common";
import { CityRepository } from "../repository/city.repository";
import { CreateCityDto } from "../dto/create-city.dto";
import { UpdateCityDto } from "../dto/update-city.dto";

@Injectable()
export class CityService {
  // Service methods would go here
  @Inject() repository:CityRepository
  
  create(dto:CreateCityDto){
    return this.repository.create(dto);
  }

  findAll(){
    return this.repository.findAll();
  }

  findOne(id:string){
    return this.repository.findOne(id);
  }

  update(id:string, dto:UpdateCityDto){
    return this.repository.update(id,dto);
  }

  remove(id:string){
    return this.repository.remove(id);
  }
}