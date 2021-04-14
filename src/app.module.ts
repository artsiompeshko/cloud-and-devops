import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

console.log(__dirname);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static_assets'),
    }),
  ],
})
export class AppModule {}
