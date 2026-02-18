const core = require("@actions/core");
const { default: Synthetic } = require("../../../src/Synthetic");

async function run() {
  const syn = new Synthetic();
  const test = await (await syn.startSynthetic(
    core.getInput('SYNTHETIC_TEST_URL'),
    core.getInput('START_URL')
  )).json();

  const MAX_RETRIES = 210;
  let retries = 0;
  let interval = null;
  let isResolved = false;

  await new Promise((resolve, reject) => {
    const checkStatus = async () => {
      // Prevent multiple resolve/reject calls
      if (isResolved) {
        return;
      }

      try {
        const result = await (await syn.getBatch(test.watch.token, test.batch.id)).json();

        // Handle completed status
        if (result.status === 'completed') {
          if (result.has_passed == true || result.has_passed == 1) {
            isResolved = true;
            if (interval) clearInterval(interval);
            return resolve(result);
          } else if (result.has_passed == false || result.has_passed == 0) {
            isResolved = true;
            if (interval) clearInterval(interval);
            return reject(new Error("Failed synthetic test"));
          } else {
            // has_passed is null/undefined or unexpected value - treat as failure
            isResolved = true;
            if (interval) clearInterval(interval);
            return reject(new Error(`Synthetic test completed with unexpected has_passed value: ${result.has_passed}`));
          }
        }

        // Handle failed status (regardless of has_passed value)
        if (result.status === 'failed') {
          isResolved = true;
          if (interval) clearInterval(interval);
          return reject(new Error("Failed synthetic test"));
        }

        // Handle other statuses (running, pending, etc.) - continue polling
        retries += 1;
        if (retries >= MAX_RETRIES) {
          isResolved = true;
          if (interval) clearInterval(interval);
          return reject(new Error("Synthetic action timeout"));
        }
      } catch (error) {
        isResolved = true;
        if (interval) clearInterval(interval);
        return reject(error);
      }
    };

    // Check immediately, then set up interval
    checkStatus().catch(reject);
    
    interval = setInterval(() => {
      checkStatus().catch(reject);
    }, 4000);
  });
}

run().catch((error) => {
  core.setFailed(error.message);
});
