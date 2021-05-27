import { Module, HttpModule } from '@nestjs/common';

import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

@Module({
  controllers: [QuotesController],
  imports: [HttpModule],
  providers: [QuotesService],
})
export class QuotesModule {}
