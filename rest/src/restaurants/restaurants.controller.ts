import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {RestaurantsService} from "./restaurants.service";
import {CreateRestaurantDto} from "./dto/create-restaurant.dto";
import {UpdateRestaurantDto} from "./dto/update-restaurant.dto";
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Restaurant} from "./entities/restaurant.entity";

@ApiTags("Restaurants")
@Controller("restaurants")
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {
    }

    @Post()
    @ApiResponse({status: 201, description: "The record has been successfully created."})
    @ApiResponse({status: 403, description: "Forbidden."})
    @ApiResponse({status: 400, description: " Bad Request."})
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantsService.create(createRestaurantDto);
    }

    @Get()
    @ApiResponse({status: 200, description: "The records has been successfully returned", type: [Restaurant]})
    @ApiQuery({name: "filter", required: false, type: String, example: "fast-food"})
    @ApiQuery({
        name: "sort",
        required: false,
        type: String,
        description: "default: asc",
        example: "asc",
        enum: ["asc", "desc"],
    })
    @ApiQuery({name: "limit", required: false, type: Number, description: "default: 20", example: 10})
    @ApiQuery({name: "page", required: false, type: Number, description: "default: 20", example: 2})
    findAll(@Query() query: { filter?: string; sort?: string; limit?: number; page?: number } = {
        sort: "asc",
        limit: 20,
        page: 1,
    }) {
        return this.restaurantsService.findAll(query);
    }

    @Get(":id")
    @ApiResponse({status: 200, description: "The record has been successfully returned", type: Restaurant})
    findOne(@Param("id") id: number) {
        return this.restaurantsService.findOne(id);
    }

    @Patch(":id")
    @ApiResponse({status: 200, description: "The record has been successfully updated", type: Restaurant})
    update(@Param("id") id: number, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        return this.restaurantsService.update(id, updateRestaurantDto);
    }

    @Delete(":id")
    @ApiResponse({status: 200, description: "The record has been successfully deleted"})
    @ApiResponse({status: 403, description: "Forbidden."})
    @ApiResponse({status: 404, description: "Not Found."})
    remove(@Param("id") id: number) {
        return this.restaurantsService.remove(id);
    }
}
