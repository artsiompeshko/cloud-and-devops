import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

@Module({
  controllers: [QuotesController],
  imports: [HttpModule, ConfigModule, HttpModule],
  providers: [QuotesService],
})
export class QuotesModule {}
