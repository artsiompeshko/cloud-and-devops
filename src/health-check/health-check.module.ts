import { Module, HttpModule } from '@nestjs/common';

import { HealthCheckController } from './health-check.controller';

@Module({
  controllers: [HealthCheckController],
  imports: [HttpModule],
})
export class HealthCheckModule {}
