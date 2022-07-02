import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

import loginPageAction from "../../pageobjects/pageactions/loginPageAction";


const loginPage = new loginPageAction();

Given("User navigate to centerop2.0 page", () => {
  loginPage.openCenteropURLFromConfig();
});

Given("User navigate to centerop2.0 {string} page", (url) => {
  loginPage.openCenteropURL(url);
});

When("User enter valid username and password", (datatable) => {
  datatable.hashes().forEach((element) => {
    loginPage.enterCredentials(element.userName, element.password);
  });
});

Then("User is Navigated to perx Dashboard", () => {
  loginPage.clickSignInBtn();
  cy.contains("Rewards").should("have.text", "Rewards");
});

