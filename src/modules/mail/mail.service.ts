import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(employee: Employee) {
    const url = 'google.com';
    const templateContent = `
    <p>Hey ${employee.name},</p>
    <p>Please click below to confirm your email</p>
    <p>
    <a>Confirm</a>
    </p>
    <p>If you did not request this email you can safely ignore it.</p>
    `;

    await this.mailerService.sendMail({
      to: employee.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      html: templateContent,
      context: {
        name: employee.name,
        url,
      },
    });
  }
  async sendOtpEmail(email: string, otp: string): Promise<void> {
    const subject = 'Password Reset OTP';
    const html = `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
