Feature: Login with admin details

  As a admin, I want to Login

  Scenario: Entering my login details
    Given that I am on the "/" page
    Then I click the "signin" in the navbar
    And I enter my admin "email"
    And I also enter my "password"
    And I click the "login" button
    And then I click the "profile" button
    And I click on the "adminpanel" on the sidebar
    And I navigate to the "order" overview
    And I also navigate to the "user" overview page
    And lastly I navigates to the "products" overview page