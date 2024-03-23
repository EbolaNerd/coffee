import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse } from '@nestjs/swagger';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {
    console.log("CoffeesController instantiated")
  }
  
  @ApiForbiddenResponse({description: "Forbidden."})
  @Public()
  @Get()
  async findAll(@Protocol("https") protocol: string, @Query() paginationQuery: PaginationQueryDto) {
    console.log(`Request protocol: ${protocol}`)
    //const { limit, offset } = paginationQuery;
    await new Promise(resolve => setTimeout(resolve, 5000))

    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    console.log(id)
    return this.coffeeService.findOne(''+id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.coffeeService.remove(id);
  }

}
