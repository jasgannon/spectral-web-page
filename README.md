# OpenAPI Linter Web Application
The OpenAPI Linter Web Application is a powerful tool designed to validate OpenAPI specifications (OAS) directly in the browser. It uses the [Spectral linter](https://github.com/stoplightio/spectral) by Stoplight, extending it with custom rulesets specifically tailored for Qualtrics public APIs. This application provides an intuitive interface for linting OAS files, supporting .json, .yml, and .yaml formats.

## Features
* File Upload: Users can upload their OAS files in `.json`, `.yml`, or `.yaml` format.
* Text Input: Alternatively, users can paste the contents of their OAS directly into a text area.
* Custom Rulesets: Incorporates custom Spectral rulesets for enhanced linting, tailored to Qualtrics APIs.
* Live Results: Linting results are displayed in real-time, offering insights into potential issues within the OAS.

## Installation

### Prerequisites

* Node.js (Latest LTS version recommended)
* npm (Comes bundled with Node.js)

### Setup

1. Clone the repository

```sh
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies

Navigate to the project directory and run:

```sh
npm install
```

3. Build the project

To compile the source code and generate a production build, run:

```sh
npm run build
```

This command uses Webpack to bundle the JavaScript and CSS assets. The output will be available in the `dist` directory.

4. Running the Application
For development purposes, you can use any simple HTTP server to serve the files in the `dist` directory. For example, using the `http-server` package:

```sh
npm install -g http-server
http-server ./dist
```

Visit the URL provided by `http-server` to access the application.


## Using the Application

To lint an OpenAPI specification:

1. Select **Upload** to select an OAS file or paste the content of your OAS into the provided text area.
2. Select **Lint Spec** to start the linting process.
3. View the linting results in the designated results area. The application will display linting issues, categorized by severity and including detailed messages.
About Spectral Linter
[Spectral](https://github.com/stoplightio/spectral) is a flexible JSON and YAML linter, designed to help improve the quality of API descriptions, documents, and data. It offers a rich set of built-in rules for OpenAPI specifications and allows for the creation of custom rulesets to fit specific needs.

About OpenAPI Specifications (OAS)
OpenAPI Specifications (OAS) offer a standard, language-agnostic interface to RESTful APIs, allowing both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic.

Contributing
Contributions to enhance the OpenAPI Linter Web Application are welcome. Please feel free to submit pull requests, report issues, and suggest enhancements.
