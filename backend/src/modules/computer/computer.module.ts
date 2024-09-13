import { Module } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { ComputerController } from './computer.controller';
import { PrismaComputerRepository } from '../../repositories/prisma/PrismaComputerRepository';
import { ComputerRepository } from '../../repositories/ComputerRepository';

@Module({
  controllers: [ComputerController],
  providers: [
    PrismaComputerRepository,
    {
      provide: ComputerService,
      useFactory: (computerRepository: ComputerRepository) => {
        return new ComputerService(computerRepository);
      },
      inject: [PrismaComputerRepository],
    },
  ],
})
export class ComputerModule {}
