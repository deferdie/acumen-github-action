const core = require("@actions/core");
const { default: Synthetic } = require("../../../src/Synthetic");

async function run() {
  const syn = new Synthetic();
  const test = await (await syn.startSynthetic(core.getInput('SYNTHETIC_TEST_URL'))).json();
  console.log(test.batch.id);

  const MAX_RETRIES = 210;
  let retries = 0;

  await new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const result = await (await syn.getBatch(test.watch.token, test.batch.id)).json();
        console.log(result.status, (result.has_passed == true || result.has_passed == 1));

        if (result.status === 'completed' && (result.has_passed == true || result.has_passed == 1)) {
          console.log('resolved');
          clearInterval(interval);  // Clear the interval on resolve
          return resolve(result);
        }

        if (result.status === 'completed' && (result.has_passed == false || result.has_passed == 0)) {
          clearInterval(interval);  // Clear the interval on reject
          return reject("Failed synthetic test");
        }

        retries += 1;
        if (retries >= MAX_RETRIES) {
          clearInterval(interval);  // Clear the interval on timeout
          return reject("Synthetic action timeout");
        }
      } catch (error) {
        clearInterval(interval);  // Clear the interval on error
        return reject(error);
      }
    }, 4000);
  });
}

run().catch((error) => {
  core.setFailed(error.message);
});
