/// <reference types="cypress"/>

const objectrepo = require("../../locators.json")
export default class RewardCreateElement{

    clickCreateNew(){
        return cy.get(objectrepo.RewardCreation.CreateNewButton)
    }

    enterRewardName(){
        return cy.get(objectrepo.RewardCreation.RewardName)
    }

    clickNextButton(){
        return cy.contains(objectrepo.RewardCreation.NextButton)
    }

    startDate(){
        return cy.get(objectrepo.RewardCreation.ValidatyPeriodStartDate)
    }

    endDate(){
        return cy.get(objectrepo.RewardCreation.ValidityPeriodEndDate)
    }

    saveButton(){
        return cy.get(objectrepo.RewardCreation.SaveButton)
    }

    rewardsMenu(){
        return cy.get(objectrepo.RewardCreation.RewardsMenu)
    }

    searchBox(){
        return cy.get(objectrepo.RewardCreation.RewardSearchBox)
    }

    validateCreatedReward(){
        return cy.get(objectrepo.RewardCreation.SearchedRewardText)
    }

    clickToOpenstartdatecalendar(){
        return cy.get(objectrepo.RewardCreation.opendatecalendar).first()
    }

    clickToOpenenddatecalendar(){
        return cy.get(objectrepo.RewardCreation.opendatecalendar).last()
    }

    checkPrivate(){
        return cy.get(objectrepo.RewardCreation.typePrivate)
    }

    validateTags(){
        return cy.get(objectrepo.RewardCreation.tags)
    }

    validatecatalog(){
        return cy.get(objectrepo.RewardCreation.catalog)
    }

    validatecategories(){
        return cy.get(objectrepo.RewardCreation.categories)
    }

    navigateToBulkUpload(){
        return cy.get(objectrepo.RewardCreation.bulkActionlink)
    }

    clickUploadButton(){
        return cy.get(objectrepo.RewardCreation.Upload_Button)
    }

    clickToUpload(){
        return cy.get(objectrepo.RewardCreation.Bulk_Upload_popUp)
    }

    clickordragfile(){
        return cy.get(objectrepo.RewardCreation.clickDragfile)
    }
}