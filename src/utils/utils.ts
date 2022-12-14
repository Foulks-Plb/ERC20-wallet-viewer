import { BadRequestException } from "@nestjs/common";
import arbitrumTokenList from '../utils/arbitrumTokenList.json';
const Web3 = require("web3");

const abi = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

export const generateContractFunctionList = async (_networkId: number, _wallet: string, tokens: any[]) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getRpc(_networkId)))
  const batch = new web3.BatchRequest()

  const ERC20OnNetWork = tokens.filter((tk: any) => tk.chainId == _networkId)

  ERC20OnNetWork.map(async ({ address: tokenAddress}: { address: string}) => {
    if (tokenAddress != null && tokenAddress != '') {
      const contract = new web3.eth.Contract(abi as any[], tokenAddress)
      try {
        batch.add(
          contract.methods.balanceOf(_wallet).call.request())
      } catch (error) {
        console.error('Error adding request to batch for token ', tokenAddress)
      }
    }
  })
  return batch
}

function getRpc(_id: number): string {
  if (_id == 1) {
    return "https://eth-rpc.gateway.pokt.network"
  }
  else if (_id == 137) {
    return "https://polygon-rpc.com"
  }
  else if (_id == 42161) {
    return "https://arbitrum.public-rpc.com"
  }
  else {
    throw new BadRequestException('network RPC error');
  }
}

export async function getTokenList(_id: number){
  if (_id == 1) {
    return await fetch('https://gateway.ipfs.io/ipns/tokens.uniswap.org').then(data => data.json())
  }
  else if (_id == 137) {
    return await fetch('https://gateway.ipfs.io/ipns/tokens.uniswap.org').then(data => data.json())
  }
  else if (_id == 42161) {
    return arbitrumTokenList
  }
  else {
    throw new BadRequestException('Token list error');
  } 
}

export async function getPriceAllTokens(_id :string[]){
  let allId: string = "";
  _id.map((id: string, i: number)=>{
    allId += id + (i < _id.length - 1 ? "%2C" : "")
  })
  return await fetch("https://api.coingecko.com/api/v3/simple/price?ids="+ allId +"&vs_currencies=usd").then(data => data.json())
}