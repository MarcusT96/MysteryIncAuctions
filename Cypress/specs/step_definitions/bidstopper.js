import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the {string} page and like the box', (url) => {
  cy.visit(url, { headers: { "Accept-Encoding": 'gzip, deflate' } });
});

When('I click on the bid button', () => {
  cy.get('.bid--button').click()
});

Then('I should see a form to place a bid', () => {
  cy.get('.bid--content').should('be.visible')
});

Then('I type in my bid amount', () => {
  cy.get('.bid--input').type('1000')
});

Then('I click on the submit button', () => {
  cy.get('.bid--content > .bid--button').click()
});

Then('I should see an error message if I am not logged in', () => {
  cy.get('.Toastify__toast-body > :nth-child(2)').should('contain', 'Du måste vara inloggad för att kunna lägga bud, vänligen logga in först!')
});