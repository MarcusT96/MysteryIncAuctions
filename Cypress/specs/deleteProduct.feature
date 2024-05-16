Feature: Product Deletion

  As an admin,
  I want to be able to delete products from the inventory
  so that I can remove products that are no longer available or relevant.

  Scenario: Navigate to admins products management page
    Given I am on the homepage
    When I click on the "Login" button in the navigation bar
    And I fill in my email and password with valid credentials
    And I click the submit button
    Then I should be back on the homepage
    And then I click the "profile" button
    And I click on the "adminpanel" on the sidebar
    And lastly I navigates to the "products" overview page