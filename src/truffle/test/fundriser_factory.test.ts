/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
import { FundraiserFactoryInstance } from 'src/types/typechain-dir-out/truffle';

const FundraiserContract = artifacts.require('Fundraiser');
const FundraiserFactoryContract = artifacts.require('FundraiserFactory');

contract('FundraiserFactory', accounts => {
  let fundraiserFactory;

  // fundraiser args
  const name = 'Beneficiary Name';
  const url = 'beneficiaryname.org';
  const imageURL = 'https://imageurl.com';
  const description = 'Beneficiary Description';
  const goal = 100;
  const beneficiary = accounts[1];

  it('increments the fundraisersCount', async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();

    const currentFundraisersCount = await fundraiserFactory.fundraisersCount();
    await fundraiserFactory.createFundraiser(
      name,
      url,
      imageURL,
      description,
      goal,
      beneficiary
    );
    const newFundraisersCount = await fundraiserFactory.fundraisersCount();

    assert.equal(
      newFundraisersCount.sub(currentFundraisersCount).toNumber(),
      1,
      'should increment by 1'
    );
  });

  it('emits the FundraiserCreated event', async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();
    const tx = await fundraiserFactory.createFundraiser(
      name,
      url,
      imageURL,
      description,
      goal,
      beneficiary
    );
    const expectedEvent = 'FundraiserCreated';
    const actualEvent = tx.logs[0].event;
    assert.equal(actualEvent, expectedEvent, 'events should match');
  });
});

contract('FundraiserFactory: fundrisers', accounts => {
  async function addFundraisers(
    factory: FundraiserFactoryInstance,
    count: number,
    accounts: string[]
  ): Promise<void> {
    const name = 'Beneficiary';
    const goal = 100;
    const lowerCaseName = name.toLowerCase();
    const beneficiary = accounts[1];
    for (let i = 0; i < count; i++) {
      await factory.createFundraiser(
        // create a series of fundraisers. The index will be used
        // to make them each unique
        `${name} ${i}`,
        `${lowerCaseName}${i}.com`,
        `${lowerCaseName}${i}.png`,
        `Description for ${name} ${i}`,
        goal,
        beneficiary
      );
    }
  }

  async function createFundraiserFactory(
    fundraiserCount: number,
    accounts: string[]
  ): Promise<FundraiserFactoryInstance> {
    const factory = await FundraiserFactoryContract.new();
    await addFundraisers(factory, fundraiserCount, accounts);
    return factory;
  }

  describe('when fundraisers collection is empty', () => {
    it('returns an empty collection', async () => {
      const factory = await createFundraiserFactory(0, accounts);
      const fundraisers = await factory.fundraisers(10, 0);
      assert.equal(fundraisers.length, 0, 'collection should be empty');
    });
  });

  describe('varying limits', () => {
    let factory: FundraiserFactoryInstance;
    beforeEach(async () => {
      factory = await createFundraiserFactory(30, accounts);
    });

    it('returns 10 results when limit requested is 10', async () => {
      const fundraisers = await factory.fundraisers(10, 0);
      assert.equal(fundraisers.length, 10, 'results size should be 10');
    });

    it('returns 20 results when limit requested is 20', async () => {
      const fundraisers = await factory.fundraisers(20, 0);
      assert.equal(fundraisers.length, 20, 'results size should be 20');
    });

    it('returns 20 results when limit requested is 30', async () => {
      const fundraisers = await factory.fundraisers(30, 0);
      assert.equal(fundraisers.length, 20, 'results size should be 20');
    });

    it('contains the fundraiser with the appropriate offset', async () => {
      const fundraisers = await factory.fundraisers(1, 0);
      const fundraiser = await FundraiserContract.at(fundraisers[0]);
      const name = await fundraiser.name();
      assert.ok(name.includes('0'), `${name} did not include the offset`);
    });

    it('contains the fundraiser with the appropriate offset', async () => {
      const fundraisers = await factory.fundraisers(1, 7);
      const fundraiser = await FundraiserContract.at(fundraisers[0]);
      const name = await fundraiser.name();
      assert.ok(name.includes('7'), `${name} did not include the offset`);
    });
  });

  describe('boundary conditions', () => {
    let factory: FundraiserFactoryInstance;
    beforeEach(async () => {
      factory = await createFundraiserFactory(10, accounts);
    });

    it('raises out of bounds error', async () => {
      try {
        await factory.fundraisers(1, 11);
        assert.fail('error was not raised');
      } catch (err) {
        if (err instanceof Error) {
          const expected = 'offset out of bounds';
          assert.ok(err.message.includes(expected), `${err.message}`);
        }
      }
    });

    it('adjusts return size to prevent out of bounds error', async () => {
      try {
        const fundraisers = await factory.fundraisers(10, 5);
        assert.equal(fundraisers.length, 5, 'collection adjusted');
      } catch (err) {
        assert.fail('limit and offset exceeded bounds');
      }
    });
  });
});
