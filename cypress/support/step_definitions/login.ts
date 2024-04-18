import { When } from "@badeball/cypress-cucumber-preprocessor";
import { clickOnText } from "./rtlDescriptors";

When("I enter user email and password", () => {
  cy.get("input[name='email']").type("marco@gmail.com");
  cy.get("input[name='password']").type("Password@123");
});

When("I click to login button", () => {
  clickOnText("Login to your account");
});
