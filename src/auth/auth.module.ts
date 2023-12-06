import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Jwtmodule, userMongooseFeature } from 'src/common/moongooseConnnect/moogoose.connect';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuards } from './guards/jwt.guards';

@Module({
  imports: [
    PassportModule.register({
      global:true,
      defaultStrategy: 'jwt'
    }),
    Jwtmodule,
    userMongooseFeature
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuards],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
