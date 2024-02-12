import fixtures from '../fixtures/example.json';

describe('Index page', () => {
  it('Should navigate to the account verification form', () => {
    cy.visit('http://localhost:3000/');
    cy.get('a[href*="account-verification"]').click();
    cy.url().should('include', '/account-verification');
  });
});

describe('Account verification form', () => {
  beforeEach(() => {
    // Setup cypress server to route API responses and to change the behavior of network requests
    cy.server();
    cy.route('/api/**').as('api');
    cy.route('https://au-api.basiq.io/**').as('basiqApi');
  });

  it('Completes step 0 - SignUp', () => {
    // Start from the "/account-verification" page
    cy.visit('http://localhost:3000/account-verification');
    // Check the step number is 1
    cy.get('[data-cy="current-step"]').contains('1');
    // Fill out the email form field
    cy.get('#email').should('be.visible').type(fixtures.email);
    // Submit the form
    cy.get('button[type="submit"]').click();
  });

  it('Completes step 1 - PreConsent', () => {
    // Check the step number
    cy.get('[data-cy="current-step"]').contains('2');
    // Open the learn more modal
    cy.contains('Learn more').click();
    // Proceed to the next step
    cy.contains('Securely connect my account').click();
    // Wait until the Consent UI Spin up
    cy.wait('@api');
  });

  // The test will finish here as we don't have mockup for CDR 

});
