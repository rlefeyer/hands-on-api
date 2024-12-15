import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { Throttle } from '@nestjs/throttler';

@Controller('restaurants')
@ApiTags('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

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

  @Throttle({ default: { limit: 3, ttl: 6000 } })
  @Roles(Role.Admin)
  @Get()
  @ApiOperation({ summary: 'Retrieve all restaurants with optional filters, sorting, and pagination' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: Number })
  @ApiQuery({ name: 'sort', required: false, description: 'Sort by a field and order, exemm sort=name:asc', type: String })
  @ApiQuery({ name: 'filter', required: false, description: 'Filters as key-value pairs, exemple filter[name]=McDonald', type: 'object' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The restaurants have been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sort') sort?: string,
    @Query('filter') filter?: Record<string, any>,
  ) {
    return this.restaurantsService.findAll({ page, limit, sort, filter });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a restaurant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the restaurant to retrieve' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The restaurant has been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The restaurant was not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

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
