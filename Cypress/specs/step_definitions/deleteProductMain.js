import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the products overview page', () => {
  cy.wait(2000)
});

When('I click the next button', () => {
  cy.get('.app__user-pagination > :nth-child(4)').click()
});

Then('I should be able to see the product I want to delete', () => {
  cy.get('.app__products-boxdetail > :nth-child(5) > :nth-child(2)').contains('CypressTestning').should('be.visible')
});

Then('I click the delete button to remove the product', () => {
  cy.get(':nth-child(5) > :nth-child(6) > .app__product-dt-btn').should('be.visible').click()
  cy.wait(2000)
});

When('I exit the admin dashboard', () => {
  cy.get('.app__sidebar-logout > svg').click()
  cy.wait(2000)
});

When('I navigate to the public auctions page', () => {
  cy.get(':nth-child(2) > a').click()
});

Then('the deleted product should not be visible', () => {
  cy.url().should('include', '/auctions');
});