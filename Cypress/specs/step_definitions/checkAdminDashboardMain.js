import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Then('then I click the {string} button', (a) => {
  cy.get('.p__opensans-profil').click()
  cy.url().should('include', 'https://team4.nodehill.se/profile');
  cy.wait(3000);
});

Then('I click on the {string} on the sidebar', (a) => {
  cy.get('.sidebar > :nth-child(5)').should('be.visible').click()
  cy.url().should('include', 'https://team4.nodehill.se/dashboard');
});

Then('I navigate to the {string} overview', (a) => {
  cy.get('.app__sidebar-menu > :nth-child(2)').click()
  cy.url().should('include', 'https://team4.nodehill.se/dashboard/orders');
  cy.wait(3000);
});

Then('I also navigate to the {string} overview page', (a) => {
  cy.get('.app__sidebar-menu > :nth-child(3)').click()
  cy.url().should('include', 'https://team4.nodehill.se/dashboard/users');
  cy.wait(3000);
});

Then('lastly I navigates to the {string} overview page', (a) => {
  cy.get('.app__sidebar-menu > :nth-child(4)').click()
  cy.url().should('include', 'https://team4.nodehill.se/dashboard/products');
});
