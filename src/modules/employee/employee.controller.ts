import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { MyAuthGuard } from 'src/utils/MyAuthGuard';
import { OtpService } from '../otp/otp.service';
import { User } from 'src/utils/decorator/employee.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly otpService: OtpService,
  ) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get('/id')
  @UseGuards(MyAuthGuard)
  findOne(@User() employee: any) {
    return this.employeeService.findOne(employee.id);
  }

  @UseGuards(MyAuthGuard)
  @Patch('/id')
  update(
    @User() employee: any,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(employee.id, updateEmployeeDto);
  }

  @UseGuards(MyAuthGuard)
  @Delete('/id')
  remove(@User() employee: any) {
    return this.employeeService.remove(employee.id);
  }

  @Post('/forget')
  async forgetPassword(@Body('email') email: string) {
    const user = await this.employeeService.findEmail(email);
    const res = await this.otpService.storeOtp(user.id);
    return res;
  }

  @Post('/forget-password')
  async setPassword(
    @Body('otp', ParseIntPipe) otp: number,
    @Body('newPassword') newPassword: string,
  ): Promise<object> {
    await this.otpService.matchOtp(otp, newPassword);
    return { msg: 'password updated successfully...' };
  }
}
