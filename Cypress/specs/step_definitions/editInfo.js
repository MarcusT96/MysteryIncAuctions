import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Inloggningssteg
Given('I am logged in and on the homepage', () => {
  cy.visit("https://team4.nodehill.se/", { headers: { "Accept-Encoding": 'gzip, deflate' } });
  cy.get('div.app__navbar-login').click();
  cy.get('[type="email"]').type('pontus@example.com');
  cy.get('[type="password"]').type('hej123');
  cy.get('button[type="submit"]').click();
  cy.url().should('eq', 'https://team4.nodehill.se/');
});

// Navigeringssteg
When('I navigate to the profile page', () => {
  cy.get('.p__opensans-profil').click();
});

Then('I should see my profile information', () => {
  cy.get('.active').should('be.visible');
});

// Lägg till de nya stegen för navigering till de olika sidorna
Then('I go to my payment options page', () => {
  cy.get('.sidebar > :nth-child(2)').click();
});

Then('I go to my reviews page', () => {
  cy.get('.sidebar > :nth-child(3)').click();
});

Then('I go to my orders page', () => {
  cy.get('.sidebar > :nth-child(4)').click();
});

Then('I go to my My Information page', () => {
  cy.get('.sidebar > :nth-child(1)').click();
});

Then('I remove my address', () => {
  cy.get(':nth-child(6) > input').clear();
  cy.get('.profile-page-form > .profile-page-button').click();
});

Then('I update my address', () => {
  cy.get(':nth-child(6) > input').type('Gatan 123');
  cy.get('.profile-page-form > .profile-page-button').click();
});