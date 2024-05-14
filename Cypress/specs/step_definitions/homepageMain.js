import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the {string} page', (url) => {
  cy.visit(url, { headers: { 'Accept-Encoding': 'gzip, deflate' } });
});