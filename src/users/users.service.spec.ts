import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './users.schema';

const mockUser = {
  username: 'testuser',
  email: 'testuser@example',
  password: 'hashedpassword',
};

const mockUserModel = {
  find: jest.fn().mockResolvedValue([mockUser]),
  create: jest.fn().mockResolvedValue(mockUser),
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
});
