import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Jwtmodule, userMongooseFeature } from 'src/common/moongooseConnnect/moogoose.connect';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    Jwtmodule,
    userMongooseFeature
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
