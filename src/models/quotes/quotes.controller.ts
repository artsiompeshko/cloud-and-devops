import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Body,
  Post,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { QuotesService } from './quotes.service';

@Controller('api/v1/quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const quotes = await this.quotesService.findAll();

      res.status(HttpStatus.OK).json(quotes);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Unable to get quotes results: ${
          e.response?.data?.message || e.message
        }`,
      });
    }
  }

  @Get('/random')
  async random(@Res() res: Response, @Query() query: { tag: string }) {
    try {
      const quote = await this.quotesService.getRandom(query.tag);

      if (!quote) {
        res.status(HttpStatus.NOT_FOUND).end();

        return;
      }

      res.status(HttpStatus.OK).json(quote);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Unable to get random quote: ${
          e.response?.data?.message || e.message
        }`,
      });
    }
  }

  @Get(':id')
  async findById(@Res() res: Response, @Param() params) {
    try {
      const quote = await this.quotesService.findById(params.id);

      if (!quote) {
        res.status(HttpStatus.NOT_FOUND).end();

        return;
      }

      res.status(HttpStatus.OK).json(quote);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Unable to find quote: ${
          e.response?.data?.message || e.message
        }`,
      });
    }
  }

  @Put(':id')
  async updateById(
    @Res() res: Response,
    @Param() params,
    @Body() quoteDto: QuoteDto,
  ) {
    try {
      const quote = await this.quotesService.updateById(params.id, quoteDto);

      if (!quote) {
        res.status(HttpStatus.NOT_FOUND).end();

        return;
      }

      res.status(HttpStatus.OK).json(quote);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Unable to update quote: ${
          e.response?.data?.message || e.message
        }`,
      });
    }
  }

  @Post()
  async add(@Res() res: Response, @Body() quoteDto: QuoteDto) {
    try {
      const quote = await this.quotesService.add(quoteDto);

      res.status(HttpStatus.OK).json(quote);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Unable to save quote: ${
          e.response?.data?.message || e.message
        }`,
      });
    }
  }

  @Delete(':id')
  async deleteById(@Res() res: Response, @Param() params) {
    try {
      const quote = await this.quotesService.deleteById(params.id);

      if (!quote) {
        res.status(HttpStatus.NOT_FOUND).end();

        return;
      }

      res.status(HttpStatus.OK).json(quote);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Unable to delete quote: ${
          e.response?.data?.message || e.message
        }`,
      });
    }
  }
}
