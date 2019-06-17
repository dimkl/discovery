(async () => {
  const { DynamicSDK } = require('../index');

  const sdk = await DynamicSDK.discover('http://localhost:8080');

  try {
    await sdk['resource']['action'](); // -> throw required fields error
    await sdk['resource']['action']({ field1: undefined }); // -> throw validations error
  } catch (err) {
    console.error(err);
  }
})();
