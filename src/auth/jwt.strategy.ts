import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignorExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
