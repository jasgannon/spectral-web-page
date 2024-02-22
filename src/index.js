document.getElementById('lintButton').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const specInput = document.getElementById('specInput');
  const lintResults = document.getElementById('lintResults');
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
      // Assuming `lintSpec` is a function you will define to lint the OpenAPI spec
      // You need to handle converting the spec string to a format Spectral can lint (if necessary) and then run Spectral
      const results = await lintSpec(spec);
      lintResults.value = JSON.stringify(results, null, 2);
  } catch (error) {
      lintResults.value = `Error during linting: ${error.message}`;
  }
});

async function lintSpec(spec) {
  // Import Spectral classes and functions. These imports assume that Spectral has been bundled with your application.
  const { Spectral, Document } = require('@stoplight/spectral-core');
  const Parsers = require('@stoplight/spectral-parsers');
  const { oas } = require('@stoplight/spectral-rulesets');

  // Initialize Spectral
  const spectral = new Spectral();

  // Attempt to parse the spec string as JSON. If that fails, parse it as YAML.
  let parsedSpec;
  try {
      parsedSpec = JSON.parse(spec);
  } catch (error) {
      try {
          parsedSpec = Parsers.Yaml.parse(spec);
      } catch (yamlError) {
          throw new Error('Failed to parse specification as JSON or YAML.');
      }
  }

  // Create a Spectral Document from the parsed spec. Assume the spec is OpenAPI for this example.
  const document = new Document(spec, Parsers.Yaml, 'spec.yaml');

  // Load a ruleset. Here, we're directly setting rules for demonstration.
  // In a real application, you might load an external ruleset file.
  await spectral.setRuleset({
      extends: [oas],
      rules: {},
  });

  // Run the linting process
  const results = await spectral.run(document);

  // Format the results as a string for display
  if (results.length === 0) {
      return 'No issues found.';
  } else {
      return results.map(result => `Path: ${result.path.join('.')} - Message: ${result.message}`).join('\n');
  }
}
function formatLintResults(results) {
    // Group results by path
    const groupedResults = results.reduce((acc, result) => {
        const path = result.path.join('.');
        if (!acc[path]) {
            acc[path] = [];
        }
        acc[path].push(result.message);
        return acc;
    }, {});

    // Build a formatted string
    let formattedString = '';
    for (const [path, messages] of Object.entries(groupedResults)) {
        formattedString += `Path: ${path}\n`;
        messages.forEach((message, index) => {
            formattedString += `  - Message ${index + 1}: ${message}\n`;
        });
        formattedString += '\n'; // Add a blank line between groups
    }

    return formattedString.trim();
}

// Assuming `results` is the array of linting results from Spectral
const formattedResults = formatLintResults(results);
// Display the formatted results in your output textarea
document.getElementById('lintResults').value = formattedResults;
