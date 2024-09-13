import { Test, TestingModule } from '@nestjs/testing';
import { ComputerService } from './computer.service';
import { ComputerRepository } from '../../repositories/ComputerRepository';
import { Computer } from './computer.entity';
import { CreateComputerDTO, Manufacturer, Status } from './computer.dto';
import { BadRequestException } from '@nestjs/common';
import { ComputerRepositoryInMemory } from '../../repositories/in-memory/ComputerRepositoryInMemory';

describe('ComputerService', () => {
  let service: ComputerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComputerRepositoryInMemory,
        {
          provide: ComputerService,
          useFactory: (computerRepository: ComputerRepository) => {
            return new ComputerService(computerRepository);
          },
          inject: [ComputerRepositoryInMemory],
        },
      ],
    }).compile();

    service = module.get<ComputerService>(ComputerService);
  });

  describe('create', () => {
    it('should create a computer with valid serial number', async () => {
      const dto: CreateComputerDTO = {
        manufacturer: Manufacturer.Apple,
        serialNumber: 'CAZ02L13ECF8',
        status: Status.InUse,
        purchaseDate: new Date('2023-01-15'),
        warrantyExpiryDate: new Date('2024-01-15'),
        specifications: 'Intel i7, 16GB RAM, 512GB SSD',
        imageURL: 'https://example.com/image.jpg',
      };

      const result: Computer = await service.create(dto);

      expect(result).toHaveProperty('id');
      expect(result.manufacturer).toBe(dto.manufacturer);
      expect(result.serialNumber).toBe(dto.serialNumber);
      expect(result.status).toBe(dto.status);
      expect(result.purchaseDate).toEqual(dto.purchaseDate);
      expect(result.warrantyExpiryDate).toEqual(dto.warrantyExpiryDate);
      expect(result.specifications).toBe(dto.specifications);
      expect(result.imageURL).toBe(dto.imageURL);
    });

    it('should throw BadRequestException for invalid serial number', async () => {
      const dto: CreateComputerDTO = {
        manufacturer: Manufacturer.Apple,
        serialNumber: 'INVALID_SERIAL',
        status: Status.Available,
        purchaseDate: new Date('2023-01-15'),
        warrantyExpiryDate: new Date('2024-01-15'),
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('list', () => {
    it('should return a list of computers', async () => {
      const dto: CreateComputerDTO = {
        manufacturer: Manufacturer.Dell,
        serialNumber: 'DELL123',
        status: Status.InMaintenance,
        purchaseDate: new Date('2023-02-20'),
        warrantyExpiryDate: new Date('2025-02-20'),
      };

      await service.create(dto);

      const query = { page: 0, limit: 10 };
      const result: Computer[] = await service.list(query);

      expect(result).toHaveLength(1);
      expect(result[0].serialNumber).toBe(dto.serialNumber);
    });
  });

  it('should update a computer with valid serial number', async () => {
    const initialData = {
      manufacturer: Manufacturer.Apple,
      serialNumber: 'CAZ02L13ECF8',
      status: Status.InUse,
      purchaseDate: new Date('2023-01-15'),
      warrantyExpiryDate: new Date('2024-01-15'),
    };

    const updatedData = {
      serialNumber: 'CAZ02L13ECF9',
      status: Status.Available,
    };

    const createdComputer = await service.create(initialData);
    const updatedComputer = await service.update(
      createdComputer.id,
      updatedData,
    );

    expect(updatedComputer).toMatchObject({
      ...createdComputer,
      ...updatedData,
    });
  });

  it('should delete a computer', async () => {
    const initialData = {
      manufacturer: Manufacturer.Apple,
      serialNumber: 'CAZ02L13ECF8',
      status: Status.InUse,
      purchaseDate: new Date('2023-01-15'),
      warrantyExpiryDate: new Date('2024-01-15'),
    };

    const createdComputer = await service.create(initialData);
    const deletedComputer = await service.delete(createdComputer.id);

    expect(deletedComputer).toMatchObject(createdComputer);

    const computers = await service.list({});
    expect(computers).not.toContainEqual(createdComputer);
  });
});
