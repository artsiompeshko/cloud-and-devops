import { Controller, Get, HttpStatus, Res, Query } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class HealthCheckController {
  @Get('/ping')
  async ping(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OK',
      time: Date.now(),
    });
  }
}
