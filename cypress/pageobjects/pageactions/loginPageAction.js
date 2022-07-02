/// <reference types="cypress" />

import LoginElements from "../pagelements/LoginElement";

export default class loginPageAction {
  constructor() {
    globalThis.element = new LoginElements();
  }

  openCenteropURLFromConfig() {
    cy.visit("/");
  }

  openCenteropURL(url) {
    cy.visit(url);
  }

  enterCredentials(userName, password) {
    element.loginUserName().type(userName);
    element.loginPassword().type(password);
  }

  clickSignInBtn() {
    element.loginSignupBtn().click();
  }
}
