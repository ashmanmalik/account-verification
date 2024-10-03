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
    cy.intercept()
    cy.route('/api/**').as('api');
    cy.route('https://au-api.basiq.io/**').as('basiqApi');
  });

});
