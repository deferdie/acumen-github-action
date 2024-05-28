const core = require("@actions/core");

const {
  default: Synthetic,
} = require("../../../src/Synthetic");

async function run() {
  const syn = new Synthetic();

  const test = await (await syn.startSynthetic(core.getInput('SYNTHETIC_TEST_URL'))).json();

  console.log(test.batch.id);

  const  MAX_RETRIES = 210;
  let retries = 0;

  await new Promise((resolve, reject) => {
    setInterval(async () => {
      const result = await (await syn.getBatch(test.batch.token, test.batch.id)).json();
      if (result.status === 'completed') {
        return resolve(result)
      }
      
      if (result.status === 'completed' && (result.has_passed == false || result.has_passed == 0)) {
        return reject("Failed synthetic test")
      }
      
      retries = retries +1;
      if (retries >= MAX_RETRIES) {
        return reject("Synthetic action timeout")
      }
    }, 4000);
  });
}

run().catch((error) => {
  core.setFailed(error.message);
});