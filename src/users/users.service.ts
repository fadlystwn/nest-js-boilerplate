import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updateUser = this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      {
        new: true,
      },
    );

    if (!updateUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updateUser;
  }

  async delete(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete({ _id: id });
  }
}
