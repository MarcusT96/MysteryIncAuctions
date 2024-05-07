Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('[type="submit"]').click()
})