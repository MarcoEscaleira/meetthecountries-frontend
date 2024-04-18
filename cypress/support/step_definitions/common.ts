import { Then, When, Given, Before } from "@badeball/cypress-cucumber-preprocessor";
import { clickOnText, findByText } from "./rtlDescriptors";

const pages = {
  Home: "/",
  Register: "/register",
};

Before(() => {
  cy.ignoreThirdPartyRequests();
});

Given("I navigate to the {string} page", (pageName: string) => {
  cy.visit(pages[pageName]);
});

When("I go to url {string}", (url: string) => {
  cy.visit(url);
});

Then("I should see the text {string}", findByText);

When("I click on the text {string}", (text: string) => {
  clickOnText(text);
});
