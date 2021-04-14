import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { quotes as initialQuotes } from './quotes';

@Injectable()
export class QuotesService {
  quotes: Quote[];

  constructor() {
    this.quotes = initialQuotes;
  }

  getActiveQuotes(): Quote[] {
    return this.quotes.filter(({ isDeleted }) => !isDeleted);
  }

  async findAll(): Promise<Quote[]> {
    return this.getActiveQuotes();
  }

  async add(quoteDto: QuoteDto): Promise<Quote> {
    const quote: Quote = {
      id: uuidv4(),
      ...quoteDto,
    };

    this.quotes.push(quote);

    return quote;
  }

  async getRandom(tag?: string): Promise<Quote> {
    const quotes = this.getActiveQuotes();

    if (tag) {
      const matchedQuotes = quotes.filter(
        ({ tags, text }) =>
          (tags && tags.some((tag) => tag.includes(tag))) || text.includes(tag),
      );

      if (matchedQuotes.length > 0) {
        return matchedQuotes[Math.floor(Math.random() * matchedQuotes.length)];
      }

      return null;
    }

    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  async findById(quoteId: string): Promise<Quote> {
    if (quoteId) {
      return this.quotes.find(({ id }) => id === quoteId);
    }

    return null;
  }

  async deleteById(quoteId: string): Promise<Quote> {
    if (quoteId) {
      const quote = this.quotes.find(({ id }) => id === quoteId);

      if (!quote) {
        return null;
      }

      quote.isDeleted = true;

      return quote;
    }

    return null;
  }

  async updateById(quoteId: string, quoteDto: QuoteDto): Promise<Quote> {
    if (quoteId) {
      const quote = this.quotes.find(({ id }) => id === quoteId);
      const nextQuote = {
        ...quote,
        ...quoteDto,
      };

      this.quotes = [
        ...this.quotes.filter(({ id }) => id !== quoteId),
        nextQuote,
      ];

      return nextQuote;
    }

    return null;
  }
}
