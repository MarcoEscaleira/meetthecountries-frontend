import { When } from "@badeball/cypress-cucumber-preprocessor";
import { clickOnText } from "./rtlDescriptors";
import { homePageDescriptor } from "../../e2e/pageDescriptors";

When("I enter user email and password", () => {
  homePageDescriptor.emailLoginInput().type("marco@gmail.com");
  homePageDescriptor.passwordLoginInput().type("Password@123");
});

When("I click to login button", () => {
  clickOnText("Login to your account");
});
