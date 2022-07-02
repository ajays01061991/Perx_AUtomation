Feature: To Create Rewards for Authorized user

    Background: Navigate to CenterOp2.0 URL and Login to CenterOp2.0 with Valid credentials
        Given User navigate to centerop2.0 "https://dashboard.perxtech.io/dashboard/signin/" page
        When User enter valid username and password
            | userName                            | password  |
            | thao+test-qa-interview@perxtech.com | admin1234 |
        Then User is Navigated to perx Dashboard

    Scenario Outline: Verify Reward Get Created and Validate Reward Created Successfully
        Given User navigate to Rewards Menu
        And User click on Create New button
        And Enter Reward Name as "<Reward_Name>"
        And Click on Next Button
        And Enter Validity Start And End Date of Reward
        And Click on Next Button
        And Click on Save Button
        Then User navigate to Rewards Menu
        And Search for Reward "<Reward_Name>"
        And Validate Created Reward "<Reward_Name>" is present on list

        Examples:
            | Reward_Name              |
            | test_Reward_Creation_006 |

    Scenario Outline: Verify Reward Get Created and Validate Reward Created Successfully
        Given User navigate to Rewards Menu
        And User click on Create New button
        And Select Type as Private
        And Enter Reward Name as "<Reward_Name>"
        When Click on Next Button
        And Enter Validity Start And End Date of Reward
        And Click on Next Button
        And Click on Save Button
        Then Fields like catalogues, labels, brands, tags and categories are not present

        Examples:
            | Reward_Name              |
            | test_Reward_Creation_006 |


    Scenario: Verify CSV File Upload and Verify it is Uploaded Successfully
        Given User Navigate to Bulk Action page
        And User click on Upload button
        When Click to upload CSV drag container
        And Click on Upload


    Scenario: Verify Text File Upload and Verify it is Uploaded Successfully
        Given User Navigate to Bulk Action page
        And User click on Upload button
        When Click to upload Text drag container
        And Click on Upload


    Scenario: Verify Excel File Upload and Verify it is Uploaded Successfully
        Given User Navigate to Bulk Action page
        And User click on Upload button
        When Click to upload Excel drag container
        And Click on Upload


