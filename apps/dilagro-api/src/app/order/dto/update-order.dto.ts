import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsOptional()
  productId?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  totalPrice?: number;

  @IsString()
  @IsOptional()
  status?: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}
