import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.create(createOrderDto);
  }

  async findAll() {
    return await this.orderRepository.findAll();
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne(id);
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updated = await this.orderRepository.update(id, updateOrderDto);
    if (!updated) throw new NotFoundException(`Order with ID ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.orderRepository.remove(id);
    if (!deleted) throw new NotFoundException(`Order with ID ${id} not found`);
    return deleted;
  }
}
