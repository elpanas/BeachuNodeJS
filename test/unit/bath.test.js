const {
    generatePostFakeInfos,
    generateMissingPostFakeInfos,
    generateWrongPostFakeInfos,
  } = require('../aux-functions'),
  { Bath } = require('../../models/bath');

jest.useFakeTimers();

describe('Bath model validation tests', () => {
  it('should validate bath', async () => {
    const newBath = generatePostFakeInfos();
    const bath = new Bath(newBath);
    expect(async () => await bath.validate()).not.toThrow();
  });

  it('should not validate bath without required name field', async () => {
    const missBath = generateMissingPostFakeInfos();
    const bath = new Bath(missBath);
    expect(async () => await bath.validate()).rejects.toThrow();
  });

  it('should not validate bath with wrong format field', async () => {
    const wrongBath = generateWrongPostFakeInfos();
    const bath = new Bath(wrongBath);
    expect(async () => await bath.validate()).rejects.toThrow();
  });
});
