// cypress.config.js
module.exports = {
  e2e: {
    supportFile: 'cypress/integration/app.spec.js',
    specPattern: 'cypress/integration/**/*.js', // Adjust this to match your file structure
    baseUrl: 'http://localhost:3000',
  },
};
