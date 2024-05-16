Feature: Login with admin details

  As a admin, I want to Login

  Scenario: Login with valid credentials
    Given I am on the homepage
    When I click on the "Login" button in the navigation bar
    And I fill in my email and password with valid credentials
    And I click the submit button
    Then I should be back on the homepage
    And then I click the profile page button
    And I click on the adminpanel on the sidebar to navigate to the admin panel
    And I navigate to the "order" overview
    And I also navigate to the "user" overview page
    And lastly I navigates to the "products" overview page