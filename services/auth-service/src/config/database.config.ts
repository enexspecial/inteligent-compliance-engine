import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    // Railway provides DATABASE_URL for PostgreSQL plugin
    const databaseUrl = this.configService.get('DATABASE_URL');
    
    return {
      type: 'postgres',
      url: databaseUrl,
      entities: [User],
      synchronize: this.configService.get('NODE_ENV') === 'development',
      logging: this.configService.get('NODE_ENV') === 'development',
      ssl: this.configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      // Railway specific configurations
      extra: {
        max: 20, // Maximum number of connections
        connectionTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
      },
    };
  }
} 