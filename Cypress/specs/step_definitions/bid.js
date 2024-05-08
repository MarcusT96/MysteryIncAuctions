import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the {string} page', (url) => {
  cy.visit(url)
});

When('I click on the bid button', () => {
  cy.get('.bid--button').click()
});

Then('I should see a form to place a bid', () => {
  cy.get('.bid--content').should('be.visible')
});

Then('I type in my bid amount', () => {
  // TODO: implement step
});

Then('I click on the submit button', () => {
  // TODO: implement step
});

Then('I should see a confirmation message', () => {
  // TODO: implement step
});