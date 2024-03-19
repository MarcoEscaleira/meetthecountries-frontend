import "@testing-library/cypress/add-commands";

Cypress.Commands.add("ignoreThirdpartyRequests", () => {
  cy.intercept(/.+sentry.+/, {}); // stubbed, never goes to the server
});
