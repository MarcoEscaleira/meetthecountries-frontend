import { Then, When, Before } from "@badeball/cypress-cucumber-preprocessor";
import { clickOnText, textPresence } from "./rtlDescriptors";
import { homePageDescriptor } from "../../e2e/pageDescriptors";

const pages = {
  Home: homePageDescriptor,
};

Before(() => {
  cy.ignoreThirdPartyRequests();
});

When("I go to url {string}", (url: string) => {
  cy.visit(url);
});

When("I go to the {string} page", (pageName: string) => {
  cy.visit(pages[pageName].url);
});

Then("I should see the text {string}", textPresence);

When("I click on the text {string}", (text: string) => {
  clickOnText(text);
});
