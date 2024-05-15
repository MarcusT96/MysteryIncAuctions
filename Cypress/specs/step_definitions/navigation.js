import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the {string} page', (url) => {
  cy.visit(url, {headers: { "Accept-Encoding":'gzip, deflate' }})
  cy.wait(1000)
      
});

When('I click on Auktioner', () => {
  cy.get('.app__navbar-links > .p__opensans').contains('Auktioner').click();
});

Then('I am on the Auctionboxes page', () => {
  cy.url().should('include', '/auctions')
});