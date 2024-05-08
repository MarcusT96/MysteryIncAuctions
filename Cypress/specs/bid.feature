Feature: I place a bid

Scenario: I place a bid on an object
  Given I am on the "box/5" page
  When I click on the bid button
  Then I should see a form to place a bid
  And I type in my bid amount
  And I click on the submit button
  Then I should see a confirmation message