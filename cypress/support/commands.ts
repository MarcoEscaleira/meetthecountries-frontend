import "@testing-library/cypress/add-commands";

Cypress.Commands.add("ignoreThirdPartyRequests", () => {
  cy.intercept(/.+sentry.+/, {}); // stubbed, never goes to the server
});
