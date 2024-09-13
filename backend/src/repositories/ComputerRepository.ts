import {
  CreateComputerDTO,
  ListComputersDTO,
  UpdateComputerDTO,
} from 'src/modules/computer/computer.dto';
import { Computer } from 'src/modules/computer/computer.entity';

export interface ComputerRepository {
  create(data: CreateComputerDTO): Promise<Computer>;
  list(query: ListComputersDTO): Promise<Computer[]>;
  update(id: number, data: UpdateComputerDTO): Promise<Computer>;
  delete(id: number): Promise<Computer>;
  findById(id: number): Promise<Computer>;
}
