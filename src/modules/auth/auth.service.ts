import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(employee: Employee): Promise<{ token: string }> {
    const payload = {
      id: employee.id,
      name: employee.name,
      email: employee.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
