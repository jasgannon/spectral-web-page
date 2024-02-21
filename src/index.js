document.getElementById("lintButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const specInput = document.getElementById("specInput");
  const lintResults = document.getElementById("lintResults");
  let spec;

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    spec = await file.text();
  } else {
    spec = specInput.value;
  }

  if (!spec) {
    lintResults.value = "Please upload a file or paste a spec to lint.";
    return;
  }

  try {
    // Convert the spec string to a format Spectral can lint (if necessary) and then run Spectral
    const results = await lintSpec(spec);
    lintResults.value = JSON.stringify(results, null, 2);
  } catch (error) {
    lintResults.value = `Error during linting: ${error.message}`;
  }
});

async function lintSpec(spec) {
  const { Spectral, Document } = require('@stoplight/spectral-core');
  const Parsers = require('@stoplight/spectral-parsers');

  const spectral = new Spectral();

  // Correctly import and use the dynamically imported ruleset
  try {
      const myRulesetModule = await import('./spectral/qualtrics.all.json');
      console.log("Imported Ruleset Module:", myRulesetModule);
      const myRuleset = myRulesetModule.default; 
      console.log("Ruleset:", myRuleset); 

      // Use the imported ruleset with Spectral
      await spectral.setRuleset(myRuleset);

      // Proceed with spec parsing and linting as before
      const parsedSpec = Parsers.Yaml.parse(spec);
      const document = new Document(spec, Parsers.Yaml, 'spec.yaml');
      const results = await spectral.run(document);

      return formatResults(results);
  } catch (error) {
      console.error("Error during setup or linting:", error);
      throw error; // Rethrow or handle as needed
  }
}

function formatResults(results) {
  if (results.length === 0) {
      return 'No issues found.';
  } else {
      return results.map(result => `Path: ${result.path.join('.')} - Message: ${result.message}`).join('\n');
  }
}
