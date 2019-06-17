(async () => {
  const { DynamicSDK } = require('../');

  const sdk = await DynamicSDK.discover('http://localhost:8080');

  try {
    await sdk['resource']['action'](); // -> throw required fields error
  } catch (err) {
    console.error(err);
  }

  try {
    await sdk['resource']['action']({ field1: undefined }); // -> throw validations error
  } catch (err) {
    console.error(err);
  }

  try {
    await sdk.resource.action({
      firstname: 'saas',
      lastname: 'asasa',
      name: 'asa',
      email: 'dimitris.klouvas@gmail.com'
    });
    console.log('success');
  } catch (err) {
    console.error(err);
  }
})();
