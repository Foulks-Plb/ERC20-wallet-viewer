
# ERC20-wallet-viewer

## Problem
Data on blockchain is very difficult to access.
How to get a list of all ERC-20 tokens and their balances with their equivalent in USD of a given address on different EVM blockchain ?

## Solution
Several solutions can be set up:
- Scrapping the whole blockchain into an indexed database and listen for new blocks to modify this database (like etherscan)
- Deploy a Subgraphs listening to ERC20 contracts: https://github.com/georgeroman/erc20-subgraph
&#8594; I was attracted to go with this efficient solution but I didn't have enough time to set it up.

### Chosen solution
My solution was to use batch with web3js:
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


...
