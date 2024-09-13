import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateComputerDTO,
  UpdateComputerDTO,
  ListComputersDTO,
} from './computer.dto';
import { ComputerService } from './computer.service';

@ApiTags('computers')
@Controller('computers')
export class ComputerController {
  constructor(private readonly computerService: ComputerService) {}

  @ApiResponse({ status: 201, description: 'Create a computer' })
  @Post()
  async create(@Body() createComputerDTO: CreateComputerDTO) {
    return this.computerService.create(createComputerDTO);
  }

  @ApiResponse({
    status: 200,
    description: 'List computers',
    type: [CreateComputerDTO],
  })
  @Get()
  async list(@Query() query: ListComputersDTO) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const filters = {
      page,
      limit,
    };
    return this.computerService.list(filters);
  }

  @ApiResponse({ status: 200, description: 'Update a computer' })
  @ApiResponse({ status: 404, description: 'Computer not found' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateComputerDTO: UpdateComputerDTO,
  ) {
    return this.computerService.update(id, updateComputerDTO);
  }

  @ApiResponse({ status: 204, description: 'Delete a computer' })
  @ApiResponse({ status: 404, description: 'Computer not found' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.computerService.delete(id);
  }
}
