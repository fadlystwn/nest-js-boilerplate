import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDocument } from './users.schema';
import { UpdateUserDto } from './dto/update-users.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: UserDocument[] = [];
      const response = await usersController.findAll();

      expect(response).toEqual(result);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findIdAndUpdteOne', () => {
    it('should return  updated user', async () => {
      const id = 'user-id';
      const updateUserDto: UpdateUserDto = {
        username: 'updateUser',
        email: 'updatedUser@example.com',
      };

      const updateUser = { _id: id, ...updateUserDto };

      jest
        .spyOn(usersService, 'update')
        .mockResolvedValue(updateUser as UserDocument);
      const response = await usersController.update(id, updateUserDto);

      expect(response).toEqual(updateUser);
      expect(usersService.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });
});
