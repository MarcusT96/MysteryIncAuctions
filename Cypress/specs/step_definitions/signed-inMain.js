import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I click the {string} in the navbar', (a) => {
  cy.get('div.app__navbar-login > .app__navbar-login').should('be.visible').click()
});

Then('I enter my admin {string}', (a) => {
  cy.get('[type="email"]').click().type('tommy@example.com')
});

Then('I also enter my {string}', (a) => {
  cy.get('[type="password"]').click().type('hej123')
});

Then('I click the {string} button', (a) => {
  cy.get('[type="submit"]').click()
});

Then('then I click the {string} button', (a) => {
  cy.get('.p__opensans-profil').click()
});

Then('I click on the {string} on the sidebar', (a) => {
  cy.get('.sidebar > :nth-child(5)').should('be.visible').click()
  cy.url().should('include', '/dashboard');
});

Then('I navigate to the {string} overview', (a) => {
  cy.get('.app__sidebar-menu > :nth-child(2)').click()
  cy.wait(3000);
});

Then('I also navigate to the {string} overview page', (a) => {
  cy.get('.app__sidebar-menu > :nth-child(3)').click()
  cy.wait(3000);
});

Then('lastly I navigates to the {string} overview page', (a) => {
  cy.get('.app__sidebar-menu > :nth-child(4)').click()
});
