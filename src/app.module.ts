import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalancesController } from './balances/balances.controller';
import { BalancesService } from './balances/balances.service';

@Module({
  imports: [],
  controllers: [AppController, BalancesController],
  providers: [AppService, BalancesService],
})
export class AppModule {}
