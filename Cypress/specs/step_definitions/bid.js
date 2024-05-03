import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the {string} page', (url) => {
  cy.visit(url)
});

Then('I click a box', () => {
  
});

Then('I should see the box details', () => {
  // TODO: implement step
});

When('I enter a bid higher than the current bid', () => {
  // TODO: implement step
});

Then('I should see a confirmation message', () => {
  // TODO: implement step
});