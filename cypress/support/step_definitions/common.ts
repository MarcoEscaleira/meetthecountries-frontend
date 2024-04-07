import { Then, When, Given, Before } from "@badeball/cypress-cucumber-preprocessor";
import { clickOnText, findByText } from "./rtlDescriptors";
import { homePageDescriptor } from "../../e2e/pageDescriptors";

const pages = {
  Home: homePageDescriptor,
};

Before(() => {
  cy.ignoreThirdPartyRequests();
});

Given("I navigate to the {string} page", (pageName: string) => {
  cy.visit(pages[pageName].url);
});

When("I go to url {string}", (url: string) => {
  cy.visit(url);
});

Then("I should see the text {string}", findByText);

When("I click on the text {string}", (text: string) => {
  clickOnText(text);
});
