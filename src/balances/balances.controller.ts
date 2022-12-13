import { Controller, Get, Param } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { transformNetwork } from '../common/pipes/transformNetwork.pipe';
import { isValidAddress } from '../common/pipes/isValidAddress.pipe';
import { Balance } from '../common/interfaces/balance.interface';

@Controller('balances')
export class BalancesController {
    constructor(private readonly balancesService: BalancesService) {}

  @Get('/:network/:wallet')
  getHello(@Param('network', new transformNetwork()) network: number, @Param('wallet', new isValidAddress()) wallet: string){
    return this.balancesService.getBalancesByWallet(network, wallet);
  }
}