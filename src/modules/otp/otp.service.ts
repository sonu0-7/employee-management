import { BadRequestException, Injectable } from '@nestjs/common';
import { Otp } from './entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    private employeeService: EmployeeService,
  ) {}

  async storeOtp(userid: number) {
    const GeneratOtp = Math.floor(100000 + Math.random() * 900000);
    const otpOb: Otp = new Otp();
    otpOb.employee_id = userid;
    otpOb.otp = GeneratOtp;

    // delete existOtp
    await this.otpRepository.delete({ employee_id: userid });
    // save the otp
    await this.otpRepository.save(otpOb);
    return { message: 'Otp has sent to your email successfully...' };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async matchOtp(otp: number, newPassword: string): Promise<any> {
    const match = await this.otpRepository.findOne({ where: { otp } });
    if (!match) {
      throw new BadRequestException('Otp is not valid');
    }
    if (match) {
      await this.employeeService.setNewPassword(newPassword, match.employee_id);
    }
    return match;
  }
}
