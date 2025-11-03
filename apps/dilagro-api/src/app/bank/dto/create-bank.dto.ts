import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBankDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  branchCode: string;

  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsString()
  @IsNotEmpty()
  branchAddress: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;
}
