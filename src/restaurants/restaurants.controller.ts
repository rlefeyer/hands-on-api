import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('restaurants')
@ApiTags('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  // Create a new restaurant
  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiBody({ description: 'The information needed to create a restaurant', type: CreateRestaurantDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The restaurant has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The provided data is invalid.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  // Retrieve all restaurants
  @Get()
  @ApiOperation({ summary: 'Retrieve all restaurants' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The restaurants have been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findAll() {
    return this.restaurantsService.findAll();
  }

  // Retrieve a restaurant by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a restaurant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the restaurant to retrieve' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The restaurant has been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The restaurant was not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  // Update a restaurant by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update a restaurant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the restaurant to update' })
  @ApiBody({ description: 'The information needed to update the restaurant', type: UpdateRestaurantDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'The restaurant has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The restaurant was not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The provided data is invalid.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  // Delete a restaurant by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a restaurant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the restaurant to delete' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The restaurant has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The restaurant was not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}