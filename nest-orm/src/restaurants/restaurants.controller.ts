import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import {ApiOkResponse} from "@nestjs/swagger";
import {Admin} from "../auth/constant.guard";

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOkResponse({status: 201, description: 'Restaurant created successfully'})
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @Admin()
  @ApiOkResponse({description: 'All restaurants returned successfully'})
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({description: 'Restaurant returned successfully'})
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({description: 'Restaurant'})
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'Restaurant deleted successfully'})
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
