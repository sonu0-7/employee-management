import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { EmployeeModule } from '../employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { EmployeeService } from '../employee/employee.service';
import { Position } from '../employee/entities/position.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    PassportModule,
    EmployeeModule,
    MailModule,
    TypeOrmModule.forFeature([Employee, Position]),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmployeeService],
  exports: [AuthService],
})
export class AuthModule {}
