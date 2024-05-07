Feature: Login

    Scenario: Login with valid credentials
        Given I am on the homepage
        When I click on the "Login" button in the navigation bar
        And I fill in my email and password with valid credentials
        And I click the submit button
        Then I should be back on the homepage
