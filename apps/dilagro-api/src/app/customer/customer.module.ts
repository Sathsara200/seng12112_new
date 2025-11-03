import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { Customer, CustomerSchema } from './schemas/customer.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
  controllers: [CustomerController],
  providers: [CustomerRepository, CustomerService],
})
export class CustomerModule {}
