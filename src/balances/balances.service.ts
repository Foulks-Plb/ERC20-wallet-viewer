import { Injectable } from '@nestjs/common';
import { generateContractFunctionList, getPriceAllTokens, getTokenList } from 'src/utils/utils';
import symbolToId from '../utils/symbolToId.json';
import { Balance } from '../common/interfaces/balance.interface';

@Injectable()
export class BalancesService {
    async getBalancesByWallet(network: number, wallet: string): Promise<Balance[]> {
        const { tokens } = await getTokenList(network)
        const batch = await generateContractFunctionList(network, wallet, tokens)

        const tokenBalances: Balance[] = []
        const Ids: string[] = []
        let batchData: any

        try {
            batchData = await batch.execute()
        } catch (error) {
            batchData = error
        }

        if (batchData?.response) {
            batchData.response.forEach((res: any, index: number) => {
                if (res?._hex) {
                    if (res.toString() != "0") {
                        const { symbol } = tokens[index]
                        Ids.push(symbolToId[symbol.toLowerCase()])
                    }
                }
            })

            const allPrice = await getPriceAllTokens(Ids)

            batchData.response.forEach((res: any, index: number) => {
                if (res?._hex) {
                    const _balance = res.toString()
                    if (_balance != "0") {
                        const { name, decimals, symbol, address } = tokens[index]
                        const price = allPrice[symbolToId[symbol.toLowerCase()]].usd
                        tokenBalances.push(
                            {
                                address: address,
                                name: name,
                                symbol: symbol,
                                decimals: decimals,
                                balance: _balance,
                                balanceUsd: Number(((Number(_balance) / Math.pow(10, decimals)) * price).toFixed(2))
                            })
                    }
                }
            })
        }

        return tokenBalances;
    }
}