import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { clickOnText, findByText } from "./rtlDescriptors";

When("the user enters all form required details", () => {
  cy.get("[data-cy='input-register-email']").type("2e2@gmail.com");
  cy.get("[data-cy='input-register-password']").type("Password@123");
  cy.get("[data-cy='input-passwordConfirm']").type("Password@123");
  cy.get("[data-cy='input-firstName']").type("Richard");
});

Then("user submits the register form", () => {
  clickOnText("Register");
});

Then("the form displays the required errors", () => {
  findByText("Enter a valid email.");
  findByText("Enter a password.");
  findByText("Enter a confirm password.");
  findByText("Enter a first name.");
});
