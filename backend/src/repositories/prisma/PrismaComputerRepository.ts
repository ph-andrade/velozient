import { Injectable } from '@nestjs/common';
import { prisma } from '../../database/prisma';
import {
  CreateComputerDTO,
  ListComputersDTO,
} from '../../modules/computer/computer.dto';
import { Computer } from 'src/modules/computer/computer.entity';

@Injectable()
export class PrismaComputerRepository {
  async create(data: CreateComputerDTO): Promise<Computer> {
    return prisma.computer.create({
      data,
    });
  }

  async findById(id: number): Promise<Computer> {
    return prisma.computer.findUnique({
      where: {
        id,
      },
    });
  }

  async list(query: ListComputersDTO): Promise<Computer[]> {
    const { page = 1, limit = 10 } = query;

    return prisma.computer.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async update(id: number, data: Partial<Computer>): Promise<Computer> {
    return prisma.computer.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Computer> {
    return prisma.computer.delete({
      where: { id },
    });
  }
}
