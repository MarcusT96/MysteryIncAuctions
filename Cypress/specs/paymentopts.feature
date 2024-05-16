Feature: Payment options

  Scenario: Add payment option
    Given I am logged in
    When I click on min profile
    And I go to betalningsalternativ
    And I click on lägg till betalningsalternativ
    And I select the type
    And I add my information
    And I click Klar
    Then I should see a new payment option