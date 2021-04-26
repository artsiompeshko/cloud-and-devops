import {
  Controller,
  Get,
  HttpStatus,
  OnApplicationShutdown,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class HealthCheckController implements OnApplicationShutdown {
  @Get('api/v1/ping')
  async ping(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OK',
      time: Date.now(),
    });
  }

  // since currently no DB connection, then just for testing purpose
  onApplicationShutdown(signal: string) {
    console.log('Gracefull shutdown', signal); // e.g. "SIGINT"
  }
}
