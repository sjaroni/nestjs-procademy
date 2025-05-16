import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  // sharedSecret: process.env.SECRET_KEY, // nicht mehr nötig, war zum verständnis von module specific configuration
  secret: process.env.JWT_TOKEN_SECRET,
  expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRATION_TIME ?? '3600', 10),
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
}));