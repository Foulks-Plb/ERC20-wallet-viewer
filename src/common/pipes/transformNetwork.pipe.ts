import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class transformNetwork implements PipeTransform {
  transform(_network: any): number {
    let networkId: number;
    if (_network == "ethereum") {
      networkId = 1
    }
    else if (_network == "polygon") {
      networkId = 137
    }
    else if (_network == "arbitrum") {
      networkId = 42161
    }
    else {
      throw new BadRequestException('This network is not supported');
    }
    return networkId;
  }
}