import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class HealthCheckController {
  @Get('api/v1/ping')
  async ping(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OK',
      time: Date.now(),
    });
  }
}
