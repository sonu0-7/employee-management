import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeService } from '../employee/employee.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    const user = await this.employeeService.findEmail(email);

    if (!user) {
      return { status: 'failed', message: 'Invalid Credentials' };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return { status: 'failed', message: 'Invalid Password' };
    }
    const token = await this.authService.login(user);
    return token;
  }
}
