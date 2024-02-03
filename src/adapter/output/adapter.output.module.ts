import { Module } from '@nestjs/common';

@Module({
  imports: [AdapterOutputModule],
  providers: [],
  exports: [AdapterOutputModule],
})
export class AdapterOutputModule {}
