require("ts-node").register({
  files: true,
});

module.exports = {
  contracts_directory: './src/truffle/contracts',
  contracts_build_directory: './src/truffle/abi',
  migrations_directory: './src/truffle/dist/migrations',
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 5000000
    }
  },
  compilers: {
    solc: {
      version: '0.8.20',
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200 // Default: 200
        }
      }
    }
  },
  mocha: {
    useColors: true,
    file: ['./src/truffle/**/*.test.js']
  }
};
