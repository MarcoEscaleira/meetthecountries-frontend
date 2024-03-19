import { Then, When, Before } from "@badeball/cypress-cucumber-preprocessor";
import { pageDescriptor as homePageDescriptor } from "../../e2e/pageDescriptors/homePage";

const pages = {
  Home: homePageDescriptor,
};

/*
  RTL descriptors and commands
*/
function findByText(text: string) {
  return cy.findAllByText(new RegExp(text));
}

function clickOnText(text: string) {
  return cy.findAllByText(new RegExp(text)).click();
}

function textPresence(text: string) {
  findByText(text);
}

Before(() => {
  cy.ignoreThirdPartyRequests();
});

When("I go to url {string}", (url: string) => {
  cy.visit(url, { failOnStatusCode: false });
});

When("I go to the {string} page", (pageName: string) => {
  cy.visit(pages[pageName].url);
});

Then("I should see the text {string}", textPresence);

When("I click on the text {string}", (text: string) => {
  clickOnText(text);
});
