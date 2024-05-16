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

When('I add my information', () => {
  cy.get('[placeholder="XXXX-XXXX-XXXX-XXXX"]').type("1234-1234-1234-1234")
  cy.get('[placeholder="XX-XX"]').type("12-12")
  cy.get('[placeholder="XXX"]').type("123")
  cy.get('[placeholder=""]').type("Test")
});

When('I click Klar', () => {
  cy.get('.paymentopt-modal-button-finish').click()
});

Then('I should be back to betalningsalternativ', () => {
  cy.get('.paymentopt-container > :nth-child(1)').should("contain", "Betalningsalternativ")
});