
Cypress.Commands.add('login', (email,password) => {
  cy.visit("https://team4.nodehill.se/", { headers: { "Accept-Encoding": 'gzip, deflate' } });
  cy.get('div.app__navbar-login').click();
  cy.get('[type="email"]').type('pontus@example.com');
  cy.get('[type="password"]').type('hej123');
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.addAll({login})