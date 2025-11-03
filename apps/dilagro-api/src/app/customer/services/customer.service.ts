import { Inject, Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repository/customer.repository";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";


@Injectable()
export class CustomerService {
  // Service methods would go here
  @Inject() repository:CustomerRepository
  
  create(dto:CreateCustomerDto){
    return this.repository.create(dto);
  }

  findAll(){
    return this.repository.findAll();
  }

  findOne(id:string){
    return this.repository.findOne(id);
  }

  update(id:string, dto:UpdateCustomerDto){
    return this.repository.update(id,dto);
  }

  remove(id:string){
    return this.repository.remove(id);
  }
}