// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './Fundraiser.sol';

contract FundraiserFactory {
  uint256 constant maxLimit = 20;
  Fundraiser[] private _fundraisers;

  event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

  /**
   * @dev Get fundraisers count
   */
  function fundraisersCount() public view returns (uint256) {
    return _fundraisers.length;
  }

  /**
   * @dev Create a fundraiser
   * @param name Fundraiser name
   * @param url Fundraiser url
   * @param imageURL Fundraiser imageURL
   * @param description Fundraiser description
   * @param goal Fundraiser goal
   * @param beneficiary Fundraiser wallet address
   */
  function createFundraiser(
    string memory name,
    string memory url,
    string memory imageURL,
    string memory description,
    uint256 goal,
    address payable beneficiary
  ) public {
    Fundraiser fundraiser = new Fundraiser(
      name,
      url,
      imageURL,
      description,
      goal,
      beneficiary,
      msg.sender
    );
    _fundraisers.push(fundraiser);

    emit FundraiserCreated(fundraiser, beneficiary);
  }

  /**
   * @dev Return paginated list of fundraisers
   * @param limit Limit
   * @param offset offset
   */
  function fundraisers(
    uint256 limit,
    uint256 offset
  ) public view returns (Fundraiser[] memory coll) {
    require(offset <= fundraisersCount(), 'offset out of bounds');

    uint256 size = fundraisersCount() - offset;
    size = size < limit ? size : limit;
    size = size < maxLimit ? size : maxLimit;

    coll = new Fundraiser[](size);

    for (uint256 i = 0; i < size; i++) {
      coll[i] = _fundraisers[offset + i];
    }

    return coll;
  }
}
