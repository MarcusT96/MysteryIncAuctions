import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I click on Contact Us', () => {
  cy.get(':nth-child(4) > a').click();
});

Then('I should be on the Contact Us page', () => {
  cy.url().should('include', '/contact');
});

Then('I can fill in my name, email and message', () => {
  cy.get('#name').type('Testköpare');
  cy.get('#email').type('test@mail.se');
  cy.get('#message').type('This is a test message');
});

Then('I can submit my message', () => {
  cy.get('form > button').click();
});