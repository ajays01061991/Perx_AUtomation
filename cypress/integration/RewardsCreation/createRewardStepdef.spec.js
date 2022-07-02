import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

import rewardCreationAction from "../../pageobjects/pageactions/rewardCreationAction";

const rewardCreate = new rewardCreationAction();

Given("User click on Create New button", () => {
  rewardCreate.clickRewardButton();
});

And("Enter Reward Name as {string}", (rewardName) => {
  rewardCreate.enterRewardName(rewardName);
});

And("Click on Next Button", () => {
  rewardCreate.clickNext();
});

And("Enter Validity Start And End Date of Reward", () => {
  rewardCreate.openStartDateCal();
  rewardCreate.validityStartDate();
  rewardCreate.openEndDateCal();
  rewardCreate.validityEndDate();
});

And("Click on Save Button", () => {
  rewardCreate.saveButton();
});

Then("User navigate to Rewards Menu", () => {
  cy.wait(8000);
  rewardCreate.clickRewardsMenu();
});

And("Search for Reward {string}", (created_reward) => {
  rewardCreate.enterRewardToSearch(created_reward);
});

And("Validate Created Reward {string} is present on list", (created_reward) => {
  rewardCreate.validateRewardCreatedExist(created_reward);
});

And("Select Type as Private", () => {
  rewardCreate.createPrivateTypeReward();
});

Then(
  "Fields like catalogues, labels, brands, tags and categories are not present",
  () => {
    rewardCreate.validationForPrivateRewards();
  }
);

Given("User Navigate to Bulk Action page", () => {
  rewardCreate.navigateToBulkAction();
});

And("User click on Upload button", () => {
  rewardCreate.clickUploadButton();
});

When("Click to upload CSV drag container", () => {
  rewardCreate.uploadcsvfile();
});

When("Click to upload Text drag container", () => {
  rewardCreate.uploadTxtfile();
});

When("Click to upload Excel drag container", () => {
  rewardCreate.uploadExcelfile();
});
And("Click on Upload", () => {
  rewardCreate.clickToUpload();
});
