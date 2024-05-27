const core = require("@actions/core");

const {
  default: Synthetic,
} = require("../../../src/Synthetic");

async function run() {

}

run().catch((error) => {
  core.setFailed(error.message);
});