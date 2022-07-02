/// <reference types="cypress" />

const fs = require("fs-extra");
const path = require("path");
const sqlServer = require('cypress-sql-server');
const dbConfig = require('../../cypress.json');
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  function processConfigName(on, config) {
    const file = config.env.name || "default";
    return getConfigFile(file).then(function (file) {
      //return file object
      return file;
    });
  }

  function getConfigFile(file) {
    const pathToConfigFile = path.resolve("cypress", "config", `${file}.json`);
    return fs.readJson(pathToConfigFile);
  }
  //Return the configuration file details
  return processConfigName(on, config);
};

module.exports = (on, Config) => {
  on("file:preprocessor", cucumber());
  
  tasks = sqlServer.loadDBPlugin(dbConfig.db);
  on("task", tasks);
  
};

// module.exports = (on, dbConfig) => {
 
// };

// module.exports = (on, config) => {
//   allureWriter(on, config);
//   return config;
// };