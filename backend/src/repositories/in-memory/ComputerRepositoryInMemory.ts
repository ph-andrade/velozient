import { Injectable } from '@nestjs/common';
import { ComputerRepository } from '../ComputerRepository';
import { Computer } from 'src/modules/computer/computer.entity';
import {
  CreateComputerDTO,
  ListComputersDTO,
  UpdateComputerDTO,
} from 'src/modules/computer/computer.dto';

@Injectable()
export class ComputerRepositoryInMemory implements ComputerRepository {
  private computers: Computer[] = [];
  private idCounter = 1;

  async create(data: CreateComputerDTO): Promise<Computer> {
    const newComputer: Computer = {
      id: this.idCounter++,
      ...data,
    };
    this.computers.push(newComputer);
    return newComputer;
  }

  async list(query: ListComputersDTO): Promise<Computer[]> {
    const { page, limit } = query;
    const referenceValue = page * limit;

    return this.computers.slice(referenceValue, referenceValue + limit);
  }

  async update(id: number, data: UpdateComputerDTO): Promise<Computer> {
    const index = this.computers.findIndex((comp) => comp.id === id);
    this.computers[index] = { ...this.computers[index], ...data };
    return this.computers[index];
  }

  async delete(id: number): Promise<Computer> {
    const index = this.computers.findIndex((comp) => comp.id === id);
    const [deletedComputer] = this.computers.splice(index, 1);
    return deletedComputer;
  }

  async findById(id: number): Promise<Computer> {
    const index = this.computers.findIndex((comp) => comp.id === id);
    if (index >= 0) {
      return this.computers[index];
    }
  }
}
