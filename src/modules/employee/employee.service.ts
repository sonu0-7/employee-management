import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';
import { Position } from './entities/position.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    private readonly mailService: MailService,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto): Promise<object> {
    const checkEmail = await this.employeeRepository.findOne({
      where: { email: createEmployeeDto.email },
    });

    if (!checkEmail) {
      createEmployeeDto.password = await bcrypt.hash(
        createEmployeeDto.password,
        10,
      );

      const { positions: positionNames, ...employeeData } = createEmployeeDto;
      const savedEmployee: Employee =
        await this.employeeRepository.save(employeeData);
      // const savedPosition = positionNames.map((name) =>
      //   this.positionRepository.create({ name }),
      // );
      const existingPosition = await this.positionRepository.find({
        where: { name: In(positionNames) },
      });
      console.log(existingPosition);

      const newPositions = positionNames
        .filter(
          (positionName) =>
            !existingPosition.find((a) => a.name === positionName),
        )
        .map((name) => this.positionRepository.create({ name }));

      const savedPositions = await this.positionRepository.save(newPositions);
      savedEmployee.positions = [...existingPosition, ...savedPositions];
      const created = await this.employeeRepository.save(savedEmployee);

      if (created) {
        await this.mailService.sendUserConfirmation(created);
        return { status: 'success', data: created };
      }
    } else {
      return {
        status: 'failed',
        message: 'Email exist, please try with other email',
      };
    }
  }

  async findAll(): Promise<{ status: string; data: Employee[] }> {
    try {
      const allEmployees = await this.employeeRepository.find();
      return { status: 'success', data: allEmployees };
    } catch (error) {
      return { status: 'error', data: [] };
    }
  }

  async findOne(id: number): Promise<Employee | object> {
    try {
      const foundRecord = await this.employeeRepository.findOne({
        where: { id: id },
      });

      if (foundRecord) {
        return { status: 'Success', data: foundRecord };
      } else {
        return {
          status: 'failed',
          message: `Resource with ID ${id} not found`,
        };
      }
    } catch (err) {
      return { status: 'error', message: 'Error fetching employees' };
    }
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<object> {
    const anEmployee = await this.employeeRepository.findOne({ where: { id } });
    if (!anEmployee) return { status: 'failed', message: 'Bad request' };

    if (!updateEmployeeDto || Object.keys(updateEmployeeDto).length === 0) {
      return { status: 'failed', message: 'data is required to update' };
    }

    const updatedEmployee = Object.assign(anEmployee, updateEmployeeDto);
    const isUpdated = this.employeeRepository.save(updatedEmployee);
    if (isUpdated) {
      return {
        status: 'Success',
        message: 'Employee record has updated...',
        data: updateEmployeeDto,
      };
    } else {
      return {
        status: 'failed',
        message: "Sorry, Employee record hasn't updated",
      };
    }
  }

  async remove(id: number): Promise<Employee | object> {
    const deleted = await this.employeeRepository.delete(id);
    if (deleted.affected === 0)
      return {
        status: 'failed',
        message: 'Bad request',
        data: `This ID ${id} doesn't exist`,
      };
    if (deleted)
      return {
        status: 'Success',
        message: 'Record has been deleted successfully...',
        data: `Record has deleted with ID ${id}`,
      };
  }

  async findEmail(email: string): Promise<Employee> {
    return await this.employeeRepository.findOne({ where: { email } });
  }

  async setNewPassword(newPassword: string, id: number): Promise<Employee> {
    const newPass = await bcrypt.hash(newPassword, 10);
    const user = await this.employeeRepository.findOne({ where: { id: id } });
    user.password = newPass;
    return await this.employeeRepository.save(user);
  }
}
