import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { HealthCheckModule } from '@app/health-check/health-check.module';
import { QuotesModule } from '@app/models/quotes/quotes.module';

import { join } from 'path';

console.log(__dirname);

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static_assets'),
    }),
    HealthCheckModule,
    QuotesModule,
  ],
})
export class AppModule {}
