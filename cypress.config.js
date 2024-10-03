const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Set base URL for the app
    supportFile: "cypress/integration/app.spec.js", // Path to the support file
    specPattern: "cypress/integration/**/*.js", // Pattern for locating spec files
    experimentalStudio: true, // Enable Cypress Studio for test recording
    setupNodeEvents(on, config) {
      // Add plugins or custom node event listeners here
      return config; // Important: Return the config object
    },
  }
});
