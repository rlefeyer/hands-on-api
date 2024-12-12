import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDecorator } from 'src/auth/decorators/user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the provided details.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data needed to create a user',
    examples: {
      validUser: {
        summary: 'A valid user creation example',
        value: {
          name: 'John Doe',
          address: '123 Main St, Anytown, USA',
          phone: '+33612131415',
          username: 'john.doe',
          password: 'password',
          role: Role.USER,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John Doe',
        address: '123 Main St, Anytown, USA',
        phone: '+6666666666',
        createdAt: '2023-01-01T12:00:00Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
    schema: {
      example: {
        statusCode: 400,
        message: ['name must be a string', 'address must be a string'],
        error: 'Bad Request',
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users.',
  })
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully retrieved.',
    type: [User],
  })
  @ApiResponse({
    status: 404,
    description: 'No users found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'No users found',
        error: 'Not Found',
      },
    },
  })
  findAll(@UserDecorator() user: any): Promise<User[]> {
    console.log('user who find all', user);
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Retrieves a user by their unique identifier.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Unique user ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user',
    description: 'Updates the details of an existing user.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Unique user ID' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Data to update the user',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
    schema: {
      example: {
        statusCode: 400,
        message: ['name must be a string', 'address must be a string'],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Deletes a user by their unique identifier.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Unique user ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    schema: {
      example: {
        success: true,
        message: 'User deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.usersService.remove(id);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Authentifier un utilisateur',
    description: "Vérifie les credentials et retourne l'utilisateur si valide",
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_doe' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['username', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur trouvé et authentifié avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé ou credentials invalides',
  })
  findBy(@Body() loginDto: LoginUserDto) {
    return this.usersService.findBy(loginDto.username, loginDto.password);
  }
}
