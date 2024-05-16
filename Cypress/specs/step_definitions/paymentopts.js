import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/* No duplicate steps, this one already in bid.js
Given('I am logged in', () => {});*/

When('I click on min profile', () => {
  cy.get('.p__opensans-profil').click()
});

When('I go to betalningsalternativ', () => {
  cy.get('.sidebar > :nth-child(2)').click()
});

When('I click on lägg till betalningsalternativ', () => {
  cy.get('.paymentopt-addpay').click()
});

When('I select the type', () => {
  cy.get('#type').click()
});

When('I add my information', () => {
  cy.get('[placeholder="XXXX-XXXX-XXXX-XXXX"]')
});

When('I click Klar', () => {
  // TODO: implement step
});

Then('I should see a new payment option', () => {
  // TODO: implement step
});