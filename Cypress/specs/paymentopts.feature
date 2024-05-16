Feature: Payment options

  Scenario: Login with valid credentials
    Given I am on the homepage
    When I click on the "Login" button in the navigation bar
    And I fill in my email and password with valid credentials
    And I click the submit button
    Then I should be back on the homepage

  Scenario: Add payment option
    Given that I am on the homepage
    And I am logged in
    When I click on min profile
    And I go to betalningsalternativ
    And I click on lägg till betalningsalternativ
    And I select the type
    And I add my information
    And I click Klar
    Then I should see a new payment option