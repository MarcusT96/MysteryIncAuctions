Feature: I try to place a bid, but am not logged in

Scenario: I place a bid on an object but am not logged in
  Given I am on the "box/5" page and like the box
  When I click on the bid button
  Then I should see a form to place a bid
  And I type in my bid amount
  And I click on the submit button
  Then I should see an error message if I am not logged in