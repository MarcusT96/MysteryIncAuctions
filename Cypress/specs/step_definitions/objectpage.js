import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the homepage', (url) => {
  cy.visit(url)
});

Then('I click on Auktioner', (a) => {
  cy.get(':nth-child(2) > a').click()
});


Then('I click on läs mer on a box', () => {
  cy.get(':nth-child(1) > .auctionbutton').click()
});

Then('I should see the box details', () => {
  cy.get('.right--container').should('be.visible')
});
