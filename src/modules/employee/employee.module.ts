import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Position } from './entities/position.entity';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';
import { Otp } from '../otp/entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Position, Otp])],
  controllers: [EmployeeController],
  providers: [EmployeeService, MailService, OtpService],
})
export class EmployeeModule {}
