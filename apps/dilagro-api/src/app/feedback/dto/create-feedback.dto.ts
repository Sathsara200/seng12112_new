import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}

