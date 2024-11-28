import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = this.categoryRepository.create({
        ...createCategoryDto,
      });
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve categorys');
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id }});
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve category');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    try {
      const result = await this.categoryRepository.update(id, updateCategoryDto);
      if (result.affected === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      const updatedCategory = await this.findOne(id);
      return updatedCategory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.categoryRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
