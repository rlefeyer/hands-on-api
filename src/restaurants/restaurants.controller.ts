import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new restaurant',
    description: 'Creates a new restaurant with the given details.',
  })
  @ApiBody({
    type: CreateRestaurantDto,
    description: 'Restaurant creation data',
    examples: {
      validRestaurant: {
        summary: 'A valid restaurant',
        value: {
          name: 'Restaurant 1',
          description: 'Description of the restaurant',
          adresse: '123 Main St, Anytown, USA',
          menus: [],
          note: 4.5,
          horaires: '10:00-22:00',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The restaurant has been successfully created.',
    type: Restaurant,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174004',
        name: 'Restaurant 1',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
    schema: {
      example: {
        statusCode: 400,
        message: ['name should not be empty'],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while processing the request.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all restaurants',
    description: 'Retrieves all restaurants.',
  })
  @ApiResponse({
    status: 200,
    description: 'The restaurants have been successfully retrieved.',
    type: [Restaurant],
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174004',
          name: 'Restaurant 1',
          description: 'Description of the restaurant',
          adresse: '123 Main St, Anytown, USA',
          menus: [],
          note: 4.5,
          horaires: '10:00-22:00',
        },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No restaurants found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'No restaurants found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while processing the request.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a restaurant by ID',
    description: 'Retrieves a restaurant by its unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'The restaurant has been successfully retrieved.',
    type: Restaurant,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174004',
        name: 'Restaurant 1',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Restaurant not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while processing the request.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a restaurant by ID',
    description: 'Updates a restaurant by its unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'The restaurant has been successfully updated.',
    type: Restaurant,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174004',
        name: 'Updated Restaurant 1',
        description: 'Updated description of the restaurant',
        adresse: '456 Main St, Anytown, USA',
        menus: [],
        note: 4.5,
        horaires: '10:00-22:00',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Restaurant not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while processing the request.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a restaurant by ID',
    description: 'Deletes a restaurant by its unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'The restaurant has been successfully deleted.',
    schema: {
      example: {
        message: 'Restaurant deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Restaurant not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Restaurant not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while processing the request.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
