import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ComputerRepository } from '../../repositories/ComputerRepository';
import {
  CreateComputerDTO,
  ListComputersDTO,
  Manufacturer,
  UpdateComputerDTO,
} from '../../modules/computer/computer.dto';
import { Computer } from '../../modules/computer/computer.entity';

@Injectable()
export class ComputerService {
  constructor(private readonly computerRepository: ComputerRepository) {}

  private validateSerialNumber(
    manufacturer: Manufacturer,
    serialNumber: string,
  ): void {
    const regexes: { [key in Manufacturer]: RegExp } = {
      [Manufacturer.Apple]:
        /^[A-Z]{3}[C-Z0-9][1-9C-NP-RTY][A-Z0-9]{3}[A-Z0-9]{4}$/,
      [Manufacturer.Dell]: /^[A-Z0-9]{7}$/,
      [Manufacturer.HP]: /^[A-Z0-9]{3}\d{3}[A-Z0-9]{4}$/,
      [Manufacturer.Lenovo]: /^\d{2}-[A-Z0-9]{5}$/,
    };

    const regex = regexes[manufacturer];
    if (!regex || !regex.test(serialNumber)) {
      throw new BadRequestException(
        `Invalid serial number for ${manufacturer}`,
      );
    }
  }

  async create(data: CreateComputerDTO): Promise<Computer> {
    this.validateSerialNumber(data.manufacturer, data.serialNumber);
    const purchaseDate = new Date(data.purchaseDate);
    const warrantyExpiryDate = new Date(data.warrantyExpiryDate);
    const requestDate = { ...data, purchaseDate, warrantyExpiryDate };
    return this.computerRepository.create(requestDate);
  }

  async list(query: ListComputersDTO): Promise<Computer[]> {
    return this.computerRepository.list(query);
  }

  async update(
    id: number,
    data: Partial<UpdateComputerDTO>,
  ): Promise<Computer> {
    if (data.serialNumber && data.manufacturer) {
      this.validateSerialNumber(data.manufacturer, data.serialNumber);
    }
    const computer = await this.computerRepository.findById(id);
    if (!computer) {
      throw new NotFoundException('Computer not found');
    }

    let requestDate = data;

    if (data.purchaseDate) {
      const purchaseDate = new Date(data.purchaseDate);
      requestDate = { ...data, purchaseDate };
    }

    if (data.warrantyExpiryDate) {
      const warrantyExpiryDate = new Date(data.warrantyExpiryDate);
      requestDate = { ...data, warrantyExpiryDate };
    }

    return this.computerRepository.update(id, requestDate);
  }

  async delete(id: number): Promise<Computer> {
    const computer = await this.computerRepository.findById(id);
    if (!computer) {
      throw new NotFoundException('Computer not found');
    }
    return this.computerRepository.delete(id);
  }
}
