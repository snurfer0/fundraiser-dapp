# Fundraiser DApp

![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/-DaisyUI-FF69B4?style=flat)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Solidity](https://img.shields.io/badge/-Solidity-363636?style=flat&logo=solidity&logoColor=white)
![Truffle](https://img.shields.io/badge/-Truffle-623D3B?style=flat&logo=truffle&logoColor=white)
![ethers.js](https://img.shields.io/badge/-ethers.js-3C3C3D?style=flat&logo=ethereum&logoColor=white)

## ⚒ Installation Instructions

1. Clone the repository: `git clone https://github.com/snurfer0/fundraiser-dapp.git`
2. Navigate to the project folder: `cd fundraiser-dapp`
3. Install dependencies: `npm install`
4. Compile solidity smart contracts: `npm run truffle:compile`
5. Generate typescript types: `npm run typechain:generate`
6. Run tests: `npm run truffle:test`
7. Set up the environment variables (next section)
8. Start Next.js App: `npm run next:dev`

## 🌈 Environtent variables

```.env
# App environment
APP_ENV="local | development | production"

# Ethereum provider token
ETH_PROVIDER_TOKEN="your-provider-token"

# Ethereum provider endpoints
ETH_HTTP_PROVIDER="your-http-provider"
ETH_WS_PROVIDER="your-ws-provider"
```
