import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @Length(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dob: Date;

  @IsNotEmpty()
  @IsString()
  address: string;

  positions?: string[];
}
