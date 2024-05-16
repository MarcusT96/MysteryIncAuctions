import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I click the {string} button in order to create a new product', (a) => {
  cy.get('.app__product-add-btn').click()
});

When('I am taken to the {string} form', (a) => {
  cy.get('.app_prodcomp-modal').should('be.visible')
  cy.get('.app_prodcomp-modal-content').should('be.visible')
});

Then('I enter the name, weight, and starting price of the product', () => {
  cy.get('#name').type('CypressActionFigureTest')

  cy.get('#weight').type('2')

  cy.get('#price').type('699')
});

Then('I select the expiration date for the product', () => {
  cy.get('#time').type('2024-05-30T17:00')
});

Then('I write a description for the product', () => {
  cy.get('#description').type('This is a cypress nr 2 action figure testing description!')
});

Then('I choose a category for the product', () => {
  cy.get('#category').select(2)
});

Then('I add an image URL for the product', () => {
  cy.get('#image').type('https://i.imgur.com/ope0F89.jpeg')
  cy.wait(2000);
});

Then('I click the {string} button to add the product', (a) => {
  cy.get('.app_prodcomp-add-btn').click();
  cy.wait(3000);
});

/*.....Checking if the new product is visible.....*/

When('I click on the next slide button', () => {
  cy.get('.app__user-pagination > :nth-child(4)')
});

Then('I should be able to see the newly added product', () => {
  cy.get('.app__products-boxdetail > :nth-child(4)').should('be.visible')
  cy.wait(3000);
});

When('I then exit the admin dashboard', () => {
  cy.get('.app__sidebar-logout > svg').click()
  cy.wait(3000);
});

When('I navigate to the auctions page', () => {
  cy.get(':nth-child(2) > a').click()
  cy.wait(3000);
});

Then('the new product should be visible', () => {
  cy.get(':nth-child(3) > .Auction-list > :nth-child(1)').should('be.visible')
  cy.wait(3000);
});

When('I press the {string} button, in order to view the details on the new product', () => {
  cy.get(':nth-child(1) > .auctionbutton').click()

  cy.get('.box--img').should('be.visible')
  cy.get('.right--container').should('be.visible')
  cy.get('.box--title').should('be.visible')
  cy.get('.product--description').should('be.visible')
  cy.get('.highest--bid').should('be.visible')
  cy.get('.time--left').should('be.visible')
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('toast is not defined')) {
    return false;
  }
  return true;
});