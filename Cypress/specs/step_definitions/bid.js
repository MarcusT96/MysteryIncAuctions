import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in', () => {
  cy.login()
  cy.wait(2000);
});

Given('I am on the box page and like the box', () => {
  cy.visit('https://team4.nodehill.se/box/17', { headers: { "Accept-Encoding": 'gzip, deflate' } });
});

When('I click on lägg bud', () => {
  cy.get('.bid--button').click();
});

Then('I should see a bid form', () => {
  cy.get('.bid--content').should('be.visible');
});

Then('I type in my amount', () => {
  cy.get('.highest--bid').invoke('text').then((text) => {
    const highestBid = parseFloat(text.replace(/[^\d.-]/g, '')); // Extract number from text
    const newBid = highestBid + 1;
    cy.get('.bid--input').type(newBid.toString());
  });
});

Then('I click on bekräfta bud', () => {
  cy.get('.bid--content > .bid--button').click();
});

Then('I should see a confirmation message', () => {
  cy.get('.Toastify__toast-body > :nth-child(2)').should('contain', 'Bud bekräftat!' );
});
