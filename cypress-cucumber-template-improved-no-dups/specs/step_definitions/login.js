import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the {string} page', (url) => {
  cy.visit(url)
});

When('I click on {string}', () => {
  cy.get('div.app__navbar-login > .app__navbar-login').click()
});

When('And I successfully log in as {string} with {string}', (email, password) => {
  cy.get('[type="email"]').type(email)
  cy.get('[type="password"]').type(password)
  cy.get('[type="submit"]').click()
});

Then('I can see {string}', (text) => {
  cy.get('.p__opensans-profil').should("contain", text)
});