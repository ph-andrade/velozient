import { Module } from '@nestjs/common';
import { ComputerModule } from './modules/computer/computer.module';

@Module({
  imports: [ComputerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
