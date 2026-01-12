import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty({ message: 'ID Number is required' })
  @IsNumber({}, { message: 'ID Number must be a number' })
  idNumber: number;
}
