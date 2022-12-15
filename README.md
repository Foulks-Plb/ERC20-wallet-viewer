
# ERC20-wallet-viewer

## Key value
- Realized: 1,5 day
- Query time: 3s&#12316;4s


## Problem
Data on blockchain is very difficult to access.
How to get a list of all ERC-20 tokens and their balances with their equivalent in USD of a given address on different EVM blockchain ?

## Solution
Several solutions can be set up:
- Scrapping the whole blockchain into an indexed database and listen for new blocks to modify this database (like etherscan)
- Deploy a Subgraphs listening to ERC20 contracts: https://github.com/georgeroman/erc20-subgraph
- Etherplex is a library that consolidates the list of the ethers.js contract function calls into one JSON-RPC call on the multicall smart contract aggregate function, which iterates and executes the list of contract function calls. https://github.com/makerdao/multicall

### Chosen solution
My solution was to use batch with web3js.
Web3.js batch allows for the queuing up of multiple requests and processing them all at once. They are mainly used to ensure serial processing of requests, and sometimes can be faster as requests are processed asynchronously.

### How does it work ?
1. Get all ERC20 contract address with this api https://gateway.ipfs.io/ipns/tokens.uniswap.org 
2. Create a queue balanceOf call request
3. Execute the batch
4. Sort data
5. Get the price of present tokens on coingecko with this api https://api.coingecko.com/api/v3/simple/price?ids=...&vs_currencies=usd
6. return balances

### Technology used
- Typescript
- Node
- NestJs
- Web3.js

## More in detail
### How to run it ?
1. `git clone https://github.com/Foulks-Plb/ERC20-wallet-viewer.git` 
2. `cd ERC20-wallet-viewer`
3. `npm install`
4. `npm run start`
5. Go to `http://localhost:8080/balances/{network}/{address}`

### Technical aspect
#### Pipe
If you enter a wrong address and an unsupported network, recorded errors will appear thanks `pipes`:
https://github.com/Foulks-Plb/ERC20-wallet-viewer/tree/main/src/common/pipes

#### Date type
All aplication is typed and I created a single custom interface for the returned data:
https://github.com/Foulks-Plb/ERC20-wallet-viewer/tree/main/src/common/interfaces

#### Utils
Several reusable functions are available in this file: 
https://github.com/Foulks-Plb/ERC20-wallet-viewer/blob/main/src/utils/utils.ts

#### ArbitrumTokenList.json
With this API https://gateway.ipfs.io/ipns/tokens.uniswap.org , Arbitrum token addresses are wrong !
So I created a static list of arbitrum token addresses. 
https://github.com/Foulks-Plb/ERC20-wallet-viewer/blob/main/src/utils/arbitrumTokenList.json

