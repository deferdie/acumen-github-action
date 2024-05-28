const core = require("@actions/core");

const {
  default: Synthetic,
} = require("../../../src/Synthetic");

async function run() {
  const syn = new Synthetic();

  syn.startSynthetic(core.getInput('SYNTHETIC_TEST_URL'));
}

run().catch((error) => {
  core.setFailed(error.message);
});