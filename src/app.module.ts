import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthCheckModule } from '@app/health-check/health-check.module';
import { QuotesModule } from '@app/models/quotes/quotes.module';

console.log(__dirname);

@Module({
  imports: [ConfigModule.forRoot(), HealthCheckModule, QuotesModule],
})
export class AppModule {}
