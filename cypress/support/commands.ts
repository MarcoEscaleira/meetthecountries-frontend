import "@testing-library/cypress/add-commands";

Cypress.Commands.add("ignoreThirdPartyRequests", () => {
  cy.intercept(/.+va.vercel-scripts.com+/, {});
});
