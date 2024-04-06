import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { homePageDescriptor } from "../../e2e/pageDescriptors";

Then("I open the menu drawer", () => {
  homePageDescriptor.menuBtn().click();
});
