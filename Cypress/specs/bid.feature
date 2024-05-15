Feature: I want to place a bid on a box as a logged in user

  Scenario: Place a bid on a box
    Given I am logged in
    And I am on the box page and like the box
    When I click on lägg bud
    Then I should see a bid form
    And I type in my amount
    And I click on bekräfta bud
    Then I should see a confirmation message
