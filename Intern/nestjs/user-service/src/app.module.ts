import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller'; 
import { UsersModule } from './users/users.module';
import { Users } from './users/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "vianh1712",
      "database": "test",
      "entities": [Users],
      "synchronize": true
    }
  ),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
