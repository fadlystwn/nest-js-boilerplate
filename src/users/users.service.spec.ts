import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './users.schema';
import { UpdateUserDto } from './dto/update-users.dto';

const mockUser = {
  _id: '2',
  username: 'testuser',
  email: 'testuser@example',
  password: 'hashedpassword',
};

const updatedMockUser = {
  ...mockUser,
  username: 'updatedUser',
  email: 'updateduser@example.com',
};

const mockUserModel = {
  find: jest.fn().mockResolvedValue([mockUser]),
  create: jest.fn().mockResolvedValue(mockUser),
  findOneAndUpdate: jest.fn().mockResolvedValue(updatedMockUser),
};

mockUserModel.create = jest.fn().mockResolvedValue(mockUser);

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = await usersService.create({
      username: 'testUser',
      email: 'testuser@example.com',
      password: 'hashedpassword',
    });

    expect(user).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      username: 'updatedUser',
      email: 'updateduser@example.com',
    };

    const updatedUser = await usersService.update(mockUser._id, updateUserDto);

    expect(updatedUser).toEqual(updatedMockUser);
    expect(mockUserModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockUser._id },
      updateUserDto,
      { new: true },
    );
  });
});
