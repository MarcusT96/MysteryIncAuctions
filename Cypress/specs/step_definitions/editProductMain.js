import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Then('I should be able to see the product I want to edit', () => {
  cy.get('.app__products-boxdetail > :nth-child(4) > :nth-child(2)').should('be.visible')
});

Then('I click the edit button in order to edit the product', () => {
  cy.get(':nth-child(4) > :nth-child(6) > .app__product-up-btn').click()
});

Then('I change the name, weight, and starting price of the product', () => {
  cy.get('#name').clear().type('CypressEditedProduct')

  cy.get('#weight').clear().type('616')

  cy.get('#price').clear().type('6969')
});

Then('I change the expiration date for the product', () => {
  cy.get('#time').clear().type('2024-06-16T16:16')
});

Then('I write a new description for the product', () => {
  cy.get('#description').clear().type('A thoughtfully descriptive Cypress edited description here ↞.')
});

Then('I choose a different category for the product', () => {
  cy.get('#category').select(8)
});

Then('I click the {string} button to save the changes', () => {
  cy.get('.app_prodcomp-update-btn').click()
  cy.wait(3000)
});

Then('I quit out of the admin dashboard', () => {
  cy.get('.app__sidebar-logout > svg').click()
  cy.wait(1000)
});

Then('the edited product should be visible', () => {
  cy.get('.auction-title').contains('CypressEditedProduct').should('be.visible')
});