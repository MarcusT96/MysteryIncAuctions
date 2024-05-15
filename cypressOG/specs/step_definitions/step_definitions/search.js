import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the auctionpage', () => {
  cy.visit("/auctions", { headers: { "Accept-Encoding": 'gzip, deflate' } })
  cy.wait(1000)
});

When('I search for {string}', (searchTerm) => {
  cy.get('.auction-search').type(searchTerm);
  cy.log(`Searching for: ${searchTerm}`);
});

Then('I should see {string} in aktiva Auktioner', (searchTerm) => {
  cy.get('.Auction-list').should('be.visible')
  cy.get('h3.auction-title').should('be.visible');
  cy.log(`Expected to see: ${searchTerm}`);
});