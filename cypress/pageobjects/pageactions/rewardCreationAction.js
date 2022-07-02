/// <reference types="cypress" />

import RewardCreateElement from "../pagelements/RewardCreateElement";

export default class loginPageAction {
  constructor() {
    globalThis.reward = new RewardCreateElement();
  }

  clickRewardButton() {
    reward.clickCreateNew().click();
  }

  enterRewardName(rewardName) {
    reward.enterRewardName().type(rewardName);
  }

  clickNext() {
    reward.clickNextButton().click();
  }

  validityStartDate() {
    reward.startDate().click();
  }

  validityEndDate() {
    reward.endDate().click();
  }

  saveButton() {
    reward.saveButton().click();
  }

  clickRewardsMenu() {
    reward.rewardsMenu().click();
  }

  enterRewardToSearch(createdreward) {
    reward.searchBox().type(createdreward);
  }

  validateRewardCreatedExist(createdreward) {
    reward.validateCreatedReward().should("contain.text", createdreward);
  }

  openStartDateCal() {
    reward.clickToOpenstartdatecalendar().click();
  }

  openEndDateCal() {
    reward.clickToOpenenddatecalendar().click();
  }

  createPrivateTypeReward() {
    reward.checkPrivate().click();
  }

  validationForPrivateRewards() {
    reward.validateTags().should("not.exist");
    reward.validatecatalog().should("not.exist");
    reward.validatecategories().should("not.exist");
  }

  navigateToBulkAction() {
    reward.navigateToBulkUpload().click();
  }

  clickUploadButton() {
    reward.clickUploadButton().click();
  }

  uploadcsvfile() {
    reward.clickordragfile().attachFile("sample_issue_vouchers.csv");
  }

  uploadTxtfile() {
    reward.clickordragfile().attachFile("sampleVoucher.txt");
  }

  uploadExcelfile() {
    reward.clickordragfile().attachFile("excelvoucher.xlsx");
  }

  clickToUpload(){
    reward.clickToUpload().click()
  }
  
}
