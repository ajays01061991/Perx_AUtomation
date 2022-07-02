import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

import sortPlanLabelAction from "../../pageobjects/pageactions/sortPlanLabelAction";

const sortPlanLabel = new sortPlanLabelAction();

Given("User navigate to Sort Plan Label", function () {
  sortPlanLabel.openSortPlanLabelPage();
});

When("User enter {string} fields in SortPlan page", function (SortPlan) {
  sortPlanLabel.addSortPlandropdown(SortPlan);
});

And("User select Mail Class as {string}", function (MailClass) {
  switch (MailClass) {
    case "First":
      sortPlanLabel.selectFirstmailClassCheckbox();
      break;
    case "Standard":
      sortPlanLabel.selectStandardmailClassCheckbox();
      break;
  }
});

And("User select Mail Type as {string}", function (MailType) {
  switch (MailType) {
    case "Letter":
      sortPlanLabel.mailTypeLetterCheckBox();
      break;
    case "Flat":
      sortPlanLabel.mailTypeFlatCheckBox();
      break;
  }
});

And("User select Print Bin as {string}", function (PrintBin) {
  switch (PrintBin) {
    case "Selected":
      sortPlanLabel.selectSelectedPrintBin();
      break;

    case "All":
      sortPlanLabel.selectAllPrintBinCheckbox();
      break;
    case "Even":
      sortPlanLabel.selectEvenPrintBinCheckBox();
      break;

    case "Odd":
      sortPlanLabel.selectOddPrintBinCheckbox();
      break;
  }
});

And("User select Aditional field as {string}", function (AdditionalField) {
  switch (AdditionalField) {
    case "Sort Plan Name":
      sortPlanLabel.selectadditionalFieldSortPlancheckbox();
      break;
    case "None":
      sortPlanLabel.selectadditionalFieldNonecheckbox();
      break;
    case "Zip Code Range":
      sortPlanLabel.selectadditionalFieldZipCodecheckbox();
      break;
    case "Custom Text":
      sortPlanLabel.selectadditionalFieldCustomTextcheckbox();
      sortPlanLabel.addCustomTextinField();
      break;
  }
});

And("User select first ContainerGroup", function () {
  sortPlanLabel.selectContainergrp();
});

And("Click on Print Button", function () {
  sortPlanLabel.printLabel();
});

Then("Selected Data from Sort Plan Label like {string},{string} ,{string} and {string} should get displayed on Label Panel",function (SortPlan,MailClass,AdditionalField,MailType) {
    sortPlanLabel.validateLabelContent(SortPlan,MailClass,AdditionalField,MailType);
  }
);
