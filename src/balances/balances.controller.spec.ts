import { Test, TestingModule } from '@nestjs/testing';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';

describe('BalancesController', () => {
  let Bcontroller: BalancesController;
  let Bservice: BalancesService;

  beforeEach(async () => {
      Bservice = new BalancesService();
      Bcontroller = new BalancesController(Bservice); 
  });

  it('should be defined', () => {
    expect(Bcontroller).toBeDefined();
  });

  it('should return an array of cats', async () => {
    // const result = ['test'];
    // jest.spyOn(Bservice, 'getBalancesByWallet').mockImplementation(() => result);

    // expect(await Bcontroller.getBalance(1, "0xb21090c8f6bac1ba614a3f529aae728ea92b6487")).toBe(result);
  });
});