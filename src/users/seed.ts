import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UsersService);

  const sampleUser: CreateUserDto = {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'securepassword123', // This will be hashed by the service
    avatar_url: 'https://example.com/avatar.jpg',
  };

  try {
    const user = await userService.create(sampleUser);
    console.log('Sample user created:', user);
  } catch (error) {
    console.error('Error creating sample user:', error.message);
  }

  await app.close();
}

bootstrap();
