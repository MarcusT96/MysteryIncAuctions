Feature: I place a bid

  Scenario: I enter the auction website and want to place a bid on a box
    Given that I am on the "/" page
    Then I click a box
    And I should see the box details
    When I enter a bid higher than the current bid
    Then I should see a confirmation message