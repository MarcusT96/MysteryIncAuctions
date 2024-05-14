import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the homepage', () => {
  cy.visit("https://team4.nodehill.se/", { headers: { "Accept-Encoding": 'gzip, deflate' } });
});

When('I click on the "Login" button in the navigation bar', () => {
  cy.get('div.app__navbar-login').click();
});

When('I fill in my email and password with valid credentials', () => {
  cy.get('[type="email"]').type('pontus@example.com');
  cy.get('[type="password"]').type('hej123');
});

When('I click the submit button', () => {
  cy.get('button[type="submit"]').click();
});

Then('I should be back on the homepage', () => {
  cy.url().should('eq', 'https://team4.nodehill.se/');
});
