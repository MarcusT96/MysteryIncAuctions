Feature: Payment options

  Scenario: Add payment option
    Given I am logged in
    When I click on min profile
    And I go to betalningsalternativ
    And I click on lägg till betalningsalternativ
    And I add my information
    And I click Klar
    Then I should be back to betalningsalternativ

  Scenario: Delete payment option
    Given I am logged in
    When I click on min profile
    And I go to betalningsalternativ
    And the last child contains ägare: test
    And I delete the new test payment option
    Then It should be gone