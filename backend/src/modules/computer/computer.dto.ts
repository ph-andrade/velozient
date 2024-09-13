import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Manufacturer {
  Apple = 'Apple',
  Dell = 'Dell',
  HP = 'HP',
  Lenovo = 'Lenovo',
}

export enum Status {
  InUse = 'In Use',
  InMaintenance = 'In Maintenance',
  Available = 'Available',
}

export class CreateComputerDTO {
  @ApiProperty({
    description: 'Manufacturer of the computer',
    example: Manufacturer.Apple,
  })
  @IsEnum(Manufacturer)
  @IsNotEmpty()
  manufacturer: Manufacturer;

  @ApiProperty({
    description: 'Unique serial number of the computer',
    example: 'CAZ02L13ECF8',
  })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({
    description: 'Current status of the computer',
    example: Status.InUse,
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiProperty({
    description: 'Purchase date of the computer',
    example: '2023-01-15T00:00:00Z',
  })
  @IsDateString()
  purchaseDate: Date;

  @ApiProperty({
    description: 'Warranty expiry date of the computer',
    example: '2024-01-15T00:00:00Z',
  })
  @IsDateString()
  warrantyExpiryDate: Date;

  @ApiProperty({
    description: 'Specifications of the computer',
    example: 'Intel i7, 16GB RAM, 512GB SSD',
  })
  @IsString()
  @IsOptional()
  specifications?: string;

  @ApiProperty({
    description: 'URL of the computer image',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  imageURL?: string;
}

export class UpdateComputerDTO {
  @ApiProperty({
    description: 'The brand or maker of the computer.',
    enum: Manufacturer,
    example: Manufacturer.Dell,
    required: false,
  })
  @IsEnum(Manufacturer)
  @IsOptional()
  manufacturer?: Manufacturer;

  @ApiProperty({
    description:
      'The unique identifier for each computer, based on the manufacturer.',
    example: 'X8F3J6D',
    required: false,
  })
  @IsString()
  @IsOptional()
  serialNumber?: string;

  @ApiProperty({
    description: 'The current operational state of the computer.',
    enum: Status,
    example: Status.InMaintenance,
    required: false,
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({
    description: 'The date on which the computer was acquired by the company.',
    example: '2023-02-15T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  purchaseDate?: Date;

  @ApiProperty({
    description: "The date on which the computer's warranty expires.",
    example: '2024-02-15T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  warrantyExpiryDate?: Date;

  @ApiProperty({
    description:
      "The textual description of the computer's technical specifications.",
    example: 'Intel i9, 32GB RAM, 1TB SSD',
    required: false,
  })
  @IsString()
  @IsOptional()
  specifications?: string;

  @ApiProperty({
    description: 'An URL containing the photo of the computer.',
    example: 'http://example.com/new-computer.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  imageURL?: string;
}

export class ListComputersDTO {
  @ApiProperty({
    description: 'The page number for pagination.',
    example: 1,
  })
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'The number of items per page for pagination.',
    example: 10,
  })
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @ApiProperty({
    description: 'Filter computers by serial number with partial match.',
    example: 'CAZ',
    required: false,
  })
  @IsString()
  @IsOptional()
  serialNumber?: string;
}
