import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (error) {
      throw new BadRequestException('Error creating user: ' + error.message);
    }
  }

  async findAll(): Promise<UserDocument[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new BadRequestException('Error fetching users: ' + error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: id },
        updateUserDto,
        { new: true },
      );

      if (!updatedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating user: ' + error.message);
    }
  }

  async delete(id: string): Promise<UserDocument | null> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return deletedUser;
    } catch (error) {
      throw new BadRequestException('Error deleting user: ' + error.message);
    }
  }
}
