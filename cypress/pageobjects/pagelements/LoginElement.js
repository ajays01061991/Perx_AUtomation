/// <reference types="cypress"/>

const objectrepo = require("../../locators.json")
export default class LoginElements{

loginUserName(){
    return cy.get(objectrepo.RewardCreation.loginUserName)
}

loginPassword(){
return cy.get(objectrepo.RewardCreation.loginPassword)
}

loginSignupBtn(){
    return cy.get(objectrepo.RewardCreation.Login)
}
}