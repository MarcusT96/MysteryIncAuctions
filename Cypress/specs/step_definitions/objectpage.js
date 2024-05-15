import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the {string} page', (url) => {
  cy.visit(url, { headers: { "Accept-Encoding": 'gzip, deflate' } });
});

Then('I click on Auktioner', () => {
  cy.get(':nth-child(2) > a').click()
});


Then('I click on läs mer on a box', () => {
  cy.get(':nth-child(1) > .auctionbutton').click()
});

Then('I should see the box details', () => {
  cy.get('.right--container').should('be.visible')
});
