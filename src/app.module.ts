import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { EmployeeModule } from './modules/employee/employee.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { OtpModule } from './modules/otp/otp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    EmployeeModule,
    AuthModule,
    MailModule,
    OtpModule,
  ],
})
export class AppModule {}
