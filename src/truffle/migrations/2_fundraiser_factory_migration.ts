const FundraiserFactoryContract = artifacts.require('FundraiserFactory');

module.exports = function (deployer: Truffle.Deployer) {
  deployer.deploy(FundraiserFactoryContract);
};
