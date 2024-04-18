import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is on the register page", () => {
  cy.visit("/register");
});

Then("I open the menu drawer", () => {
  cy.get("[data-cy='menu-toggle']").click();
});
