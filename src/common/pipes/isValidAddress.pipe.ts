import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
var Web3 = require('web3');

@Injectable()
export class isValidAddress implements PipeTransform {
  transform(_address: any) {
    const web3 = new Web3();
    if(!web3.utils.isAddress(_address))
    {
      throw new BadRequestException('Address format is invalid');
    }
    return _address;
  }
}