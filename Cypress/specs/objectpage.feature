Feature: I read more about a box

  Scenario: I enter the auction website and want to read more about a box
    Given I am on the "/" page
    Then I click on Auktioner
    Then I click on läs mer on a box
    Then I should see the box details
    