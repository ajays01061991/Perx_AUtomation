**Run cucumber/gherkin-syntaxed specs with Cypress.io**

**Table of contents**
    Get started
        Installation
        Cypress Configuration
        Configuration
    How to organize the tests
        Single feature files
        Bundled features files
        Step definitions
            Step definitions creation
            Reusable step definitions
    How to write tests
        Cucumber Expressions
        Given/When/Then functions
        Data table parameters
        Custom Parameter Type Resolves
        Before and After hooks
        Background section
        Sharing context
        Smart tagging
    How to run the tests
        Running tagged tests
        Ignoring specific scenarios using tags when executing test runner
        Output


**Get started**

Installation
Install the plugin by running:

npm install --save-dev cypress-cucumber-preprocessor

**Cypress Configuration**

Add it to your plugins:

cypress/plugins/index.js

const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}

Add support for feature files to your Cypress configuration

cypress.json

{
  "testFiles": "**/*.feature"
}

**Configuration**

Please make use of cosmiconfig to create a configuration for the plugin, for example, by adding this section to your package.json:

"cypress-cucumber-preprocessor": {
  "nonGlobalStepDefinitions": true
}


**How to organize the tests**

**Single feature files**

Put your feature files in cypress/integration/

Example: cypress/integration/Google.feature

Feature: Google Main Page

  I want to open a search engine
  
  @focus
  Scenario: Opening a search engine page
    Given I open CenterOp2.0 page
    Then I see "CenterOp2.0" in the title

The @focus tag is not necessary, but we want to you to notice it so you look it up below. It will speed up your workflow significantly!

**Bundled features files**

When running Cypress tests in a headless mode, the execution time can get pretty bloated, this happens because by default Cypress will relaunch the browser between every feature file. The cypress-cucumber-preprocessor gives you the option to bundle all feature files before running the tests, therefore reducing the execution time.

You can take advantage of this by creating .features files. You choose to have only one in the root of the directory cypress/integrations or per directory.

You also have to add support for .features files to your Cypress configuration

cypress.json

{
  "testFiles": "**/*.{feature,features}"
}

**To run the bundled tests:**

cypress run --spec **/*.features
Step definitions
This is the RECOMMENDED way

**Step definitions creation**

The .feature file will use steps definitions from a directory with the same name as your .feature file. The javascript files containing the step definitions can have other names if you want to break them into different concerns.

Easier to show than to explain, so, assuming the feature file is in cypress/integration/Google.feature , as proposed above, the preprocessor will read all the files inside cypress/integration/Google/, so:

cypress/integration/centerop/centerop2.js (or any other .js file in the same path)

import { Given } from "cypress-cucumber-preprocessor/steps";

const url = 'https://cops2-sitedev.psi.psigroupinc.com/'
Given('I open CenterOp2.0 page', () => {
  cy.visit(url)
})
This is a good place to put before/beforeEach/after/afterEach hooks related to that particular feature. This is incredibly hard to get right with pure cucumber.

**Reusable step definitions**

We also have a way to create reusable step definitions. Put them in cypress/integration/common/

Example: cypress/integration/common/i_see_string_in_the_title.js

import { Then } from "cypress-cucumber-preprocessor/steps";

Then(`I see {string} in the title`, (title) => {
  cy.title().should('include', title)
})
This is a good place to put global before/beforeEach/after/afterEach hooks.

Given/When/Then functions
Since Given/When/Then are on global scope please use

/* global Given, When, Then */
to make IDE/linter happy or import them directly as shown in the above examples.

**Data table parameters**

To create steps that use gherkin data tables, the step definition needs to take an object and handle it like in these examples: Example Feature, Example Step Definition.


**Before and After hooks**

The cypress-cucumber-preprocessor supports both Mocha's before/beforeEach/after/afterEach hooks and Cucumber's Before and After hooks.

The Cucumber hooks implementation fully supports tagging as described in the cucumber js documentation. So they can be conditionally selected based on the tags applied to the Scenario. This is not possible with Mocha hooks.

Cucumber Before hooks run after all Mocha before and beforeEach hooks have completed and the Cucumber After hooks run before all the Mocha afterEach and after hooks.

Example:

const {
  Before,
  After,
  Given,
  Then
} = require("cypress-cucumber-preprocessor/steps");

// this will get called before each scenario
Before(() => {
  beforeCounter += 1;
  beforeWithTagCounter = 0;
});

// this will only get called before scenarios tagged with @foo
Before({ tags: "@foo" }, () => {
  beforeWithTagCounter += 1;
});

Given("My Step Definition", () => {
  // ...test code here
})
Note: to avoid confusion with the similarly named Mocha before and after hooks, the Cucumber hooks are not exported onto global scope. So they need explicitly importing as shown above.

**Background section**

Adding a background section to your feature will enable you to run steps before every scenario. For example, we have a counter that needs to be reset before each scenario. We can create a given step for resetting the counter.

let counter = 0;

Given("counter has been reset", () => {
  counter = 0;
});

When("counter is incremented", () => {
  counter += 1;
});

Then("counter equals {int}", value => {
  expect(counter).to.equal(value);
});
Feature: Background Section
  
   Background:
    Given counter has been reset

   Scenario: Basic example #1
     When counter is incremented
     Then counter equals 1

   Scenario: Basic example #2
     When counter is incremented
     When counter is incremented
     Then counter equals 2
**Sharing context**

You can share context between step definitions using cy.as() alias.

Example:

Given('I go to the add new item page', () => {
  cy.visit('/addItem');
});

When('I add a new item', () => {
  cy.get('input[name="addNewItem"]').as('addNewItemInput');
  cy.get('@addNewItemInput').type('My item');
  cy.get('button[name="submitItem"]').click();
})

Then('I see new item added', () => {
  cy.get('td:contains("My item")');
});

Then('I can add another item', () => {
  expect(cy.get('@addNewItemInput').should('be.empty');
});


**Smart tagging**

Start your tests without setting any tags. And then put a @focus on the scenario (or scenarios) you want to focus on while development or bug fixing.

For example:

Feature: Smart Tagging

  As a cucumber cypress plugin which handles Tags
  I want to allow people to select tests to run if focused
  So they can work more efficiently and have a shorter feedback loop

  Scenario: This scenario should not run if @focus is on another scenario
    Then this unfocused scenario should not run

  @focus
  Scenario: This scenario is focused and should run
    Then this focused scenario should run

  @this-tag-affects-nothing
  Scenario: This scenario should also not run
    Then this unfocused scenario should not run

  @focus
  Scenario: This scenario is also focused and also should run
    Then this focused scenario should run
How to run the tests
Run your Cypress Launcher the way you would usually do, for example:

./node_modules/.bin/cypress open
click on a .feature file on the list of specs

**Running tagged tests**

You can use tags to select which test should run using cucumber's tag expressions. In order to initialize tests using tags you will have to run cypress and pass TAGS environment variable.

Example:

  ./node_modules/.bin/cypress-tags run -e TAGS='not @foo and (@bar or @zap)'
Please note - we use our own cypress-tags wrapper to speed things up. This wrapper calls the cypress executable from local modules and if not found it falls back to the globally installed one. For more details and examples please take a look to the example repo.

**Ignoring specific scenarios using tags when executing test runner**

You can also use tags to skip or ignore specific tests/scenarios when running cypress test runner (where you don't have the abilitiy to pass parameters like in the examples above for the execution)

The trick consists in adding the "env" property with the "TAGS" subproperty in the cypress.json configuration file. It would look something like this:

{
    "env": {
        "TAGS": "not @ignore"
    },
    //rest of configuration options
    "baseUrl": "yourBaseUrl",
    "ignoreTestFiles": "*.js",
    //etc
}
Then, any scenarios tagged with @ignore will be skipped when running the tests using the cypress test runner

Limiting to a subset of feature files
You can use a glob expression to select which feature files should be included.

Example:

  ./node_modules/.bin/cypress-tags run -g 'cypress/integration/**/*.feature'
or

  ./node_modules/.bin/cypress-tags run --glob 'cypress/integration/**/*.feature'
or

**Report**

Output, by default, is written to the folder cypress/cucumber-json, and one file is generated per feature.

This behaviour is configurable. Use cosmiconfig to create a configuration for the plugin, see step definition discussion above and add the following to the cypress-cucumber-preprocessor section in package.json to turn it off or change the defaults:

  "cypress-cucumber-preprocessor": {
    "cucumberJson": {
      "generate": true,
      "outputFolder": "cypress/cucumber-json",
      "filePrefix": "",
      "fileSuffix": ".cucumber"
    }
  }
# Perx_AUtomation
