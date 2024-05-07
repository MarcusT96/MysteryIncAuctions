import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the homepage', () => {
  cy.visit('http://localhost:5173');
});

When('I click on the "Login" button in the navigation bar', () => {
  cy.get('div.app__navbar-login').click();
});

When('I fill in my email and password with valid credentials', () => {
  cy.get('[type="email"]').type('pontus@example.com');
  cy.get('[type="password"]').type('qweasdzxc');
});

When('I click the submit button', () => {
  cy.get('button[type="submit"]').click();
});

Then('I should be back on the homepage', () => {
  cy.url().should('eq', 'http://localhost:5173/');
});

