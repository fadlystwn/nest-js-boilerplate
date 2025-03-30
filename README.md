# NestJS Boilerplate Setup

## Prerequisites
Before installing and running the NestJS boilerplate, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [NestJS CLI](https://docs.nestjs.com/cli)
- MongoDB (if using a database)

## Installation

### 1. Install NestJS CLI (if not installed)
```bash
npm install -g @nestjs/cli
```

### 2. Clone the Boilerplate Repository
```bash
git clone https://github.com/your-repo/nestjs-boilerplate.git
```
Navigate into the project directory:
```bash
cd nestjs-boilerplate
```

### 3. Install Dependencies
```bash
npm install
```

## Running the Application

### 1. Start the Development Server
```bash
npm run start
```

For watch mode (auto-restart on changes):
```bash
npm run start:dev
```

### 2. Start the Production Server
```bash
npm run start:prod
```

## Environment Variables Setup
Create a `.env` file in the root directory and add:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mydatabase
SECRET=mySuperSecretKey
```

## Connecting to MongoDB
Install Mongoose and NestJS integration:
```bash
npm install @nestjs/mongoose mongoose
```
Modify `app.module.ts`:
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
})
export class AppModule {}
```

## Authentication Setup (JWT)
Install necessary packages:
```bash
npm install @nestjs/passport passport @nestjs/jwt passport-jwt
```

Update `auth.module.ts`:
```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
})
export class AuthModule {}
```

## Testing
To run tests:
```bash
npm run test
```
For end-to-end tests:
```bash
npm run test:e2e
```

## API Endpoints
| Method | Endpoint     | Description          |
|--------|-------------|----------------------|
| POST   | `/auth/login` | User login          |
| GET    | `/users`     | Get all users       |

## Deployment
1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Run the production server:**
   ```bash
   npm run start:prod
   ```

## License
This boilerplate is licensed under the MIT License.

