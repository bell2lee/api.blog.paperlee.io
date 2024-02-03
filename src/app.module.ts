import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdapterOutputModule } from './adapter/output/adapter.output.module';

@Module({
  imports: [AdapterOutputModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
