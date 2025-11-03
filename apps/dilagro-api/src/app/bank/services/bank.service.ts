import { Inject, Injectable } from "@nestjs/common";
import { BankRepository } from "../repository/bank.repository";
import { CreateBankDto } from "../dto/create-bank.dto";
import { UpdateBankDto } from "../dto/update-bank.dto";


@Injectable()
export class BankService {
  // Service methods would go here
  @Inject() repository:BankRepository
  
  create(dto:CreateBankDto){
    return this.repository.create(dto);
  }

  findAll(){
    return this.repository.findAll();
  }

  findOne(id:string){
    return this.repository.findOne(id);
  }

  update(id:string, dto:UpdateBankDto){
    return this.repository.update(id,dto);
  }

  remove(id:string){
    return this.repository.remove(id);
  }
}