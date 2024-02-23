import pkg from '@stoplight/spectral-core';
const { Spectral } = pkg;
import bundle from "@stoplight/spectral-ruleset-bundler/with-loader";
const { bundleAndLoadRuleset } = bundle;

// create a ruleset that extends the spectral:oas ruleset
const myRuleset = `extends: spectral:oas
rules: {}`;

// try to load an external ruleset
const fs = {
  promises: {
    async readFile(filepath) {
      if (filepath === "/.spectral.yaml") {
        return myRuleset;
      }

      throw new Error(`Could not read ${filepath}`);
    },
  },
};

const spectral = new Spectral();
spectral.setRuleset(await bundleAndLoadRuleset("/.spectral.yaml", { fs, fetch }));