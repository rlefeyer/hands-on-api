import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import {Roles} from "../auth/roles.decorator";
import {Role} from "../auth/role.enum";

@ApiTags("Restaurants")
@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new restaurant" })
  @ApiResponse({
    status: 201,
    description: "Restaurant has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid data provided." })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all restaurants" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all restaurants.",
  })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a restaurant by ID" })
  @ApiParam({ name: "id", description: "The ID of the restaurant to retrieve" })
  @ApiResponse({
    status: 200,
    description: "The restaurant with the given ID.",
  })
  @ApiResponse({ status: 404, description: "Restaurant not found." })
  findOne(@Param("id") id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a restaurant by ID" })
  @ApiParam({ name: "id", description: "The ID of the restaurant to update" })
  @ApiResponse({
    status: 200,
    description: "The restaurant has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Restaurant not found." })
  update(
    @Param("id") id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a restaurant by ID" })
  @ApiParam({ name: "id", description: "The ID of the restaurant to delete" })
  @ApiResponse({
    status: 200,
    description: "The restaurant has been successfully removed.",
  })
  @ApiResponse({ status: 404, description: "Restaurant not found." })
  @Roles(Role.Admin)
  remove(@Param("id") id: string) {
    return this.restaurantsService.remove(+id);
  }
}
