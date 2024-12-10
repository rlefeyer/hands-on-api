import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    try {
      const newCategory = this.categoryRepository.create(createCategoryInput);
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({ relations: ['restaurants'] });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve categories');
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id }, relations: ['restaurants'] });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve category');
    }
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    try {
      const result = await this.categoryRepository.update(id, updateCategoryInput);
      if (result.affected === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      const updatedCategory = await this.findOne(id);
      return updatedCategory;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.categoryRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}