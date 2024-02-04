import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdapterOutputModule } from './adapter/output/adapter.output.module';
import { AdapterInputModule } from './adapter/input/adapter.input.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    { module: CqrsModule, global: true },
    AdapterInputModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
