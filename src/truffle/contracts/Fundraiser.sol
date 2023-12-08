// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Fundraiser is Ownable {
  struct Donation {
    uint256 value;
    uint256 date;
  }

  mapping(address => Donation[]) private _donations;

  event DonationReceived(address indexed donor, uint256 value);
  event Withdraw(uint256 amount);

  string public name;
  string public url;
  string public imageURL;
  string public description;
  uint256 public goal;

  address public custodian;
  address payable public beneficiary;

  uint256 public totalDonations = 0;
  uint256 public donationsCount = 0;

  constructor(
    string memory _name,
    string memory _url,
    string memory _imageURL,
    string memory _description,
    uint256 _goal,
    address payable _beneficiary,
    address _custodian
  ) Ownable(msg.sender) {
    name = _name;
    url = _url;
    imageURL = _imageURL;
    description = _description;
    beneficiary = _beneficiary;
    goal = _goal;
    custodian = _custodian;
    _transferOwnership(_custodian);
  }

  /**
   * @dev Update beneficiary
   * @param _beneficiary Benerifiary address
   */
  function setBeneficiary(address payable _beneficiary) public onlyOwner {
    beneficiary = _beneficiary;
  }

  /**
   * @dev Return wallet's donations count
   */
  function myDonationsCount() public view returns (uint256) {
    return _donations[msg.sender].length;
  }

  /**
   * @dev Return wallet's donations
   */
  function myDonations()
    public
    view
    returns (uint256[] memory values, uint256[] memory dates)
  {
    uint256 count = myDonationsCount();
    values = new uint256[](count);
    dates = new uint256[](count);
    for (uint256 i = 0; i < count; i++) {
      Donation storage donation = _donations[msg.sender][i];
      values[i] = donation.value;
      dates[i] = donation.date;
    }

    return (values, dates);
  }

  /**
   * @dev Make a donation
   */
  function donate() public payable {
    Donation memory donation = Donation({
      value: msg.value,
      date: block.timestamp
    });

    _donations[msg.sender].push(donation);
    totalDonations = totalDonations + msg.value;
    donationsCount++;

    emit DonationReceived(msg.sender, msg.value);
  }

  /**
   * @dev Transfer contrac's funds to beneficiary wallet
   */
  function withdraw() public payable onlyOwner {
    uint256 balance = address(this).balance;
    beneficiary.transfer(balance);
    emit Withdraw(balance);
  }

  /**
   * @dev Anonymous donation
   */
  receive() external payable {
    totalDonations = totalDonations + msg.value;
    donationsCount++;
  }
}
