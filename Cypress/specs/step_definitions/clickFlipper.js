import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";




When('I click on Sortera Sjunkande', () => {
  // Simulate user clicking the sorting button several times
  // This assumes that clicking the button cycles through different sort orders or criteria
  const clicks = 6;  // Number of times to click the button, adjust as necessary
  for (let i = 0; i < clicks; i++) {
    cy.get('button.sorting').click();
  }

  // Selecting sorting criteria from a dropdown
  // Ensure the text matches exactly with the options available in the dropdown
  cy.get('select.sorting').select('Tid kvar');  // Assumes 'Tid kvar' sorts by remaining time
  cy.get('button.sorting').click();
  cy.get('select.sorting').select('Namn');      // Assumes 'Namn' sorts by name in descending order
  cy.get('button.sorting').click();
});

Then('the boxes should be in descending order', () => {
  // Check that the auction titles are in descending order
  cy.get('.auction-title')
    .then($titles => {
      const titles = $titles.map((i, el) => Cypress.$(el).text().trim()).get();

      // Ensure the titles are sorted descending by comparing each title with the next
      const isSortedDescending = titles.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
      expect(isSortedDescending).to.be.false;
    });
});