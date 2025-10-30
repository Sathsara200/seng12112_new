import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty({ message: 'City name is required' })
  @MaxLength(50, { message: 'City name is too long' })
  name: string;
}
