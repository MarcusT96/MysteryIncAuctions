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
    And then I click the profile page button
    And I click on the adminpanel on the sidebar to navigate to the admin panel
    And lastly I navigates to the "products" overview page

  Scenario: Deleting a product
    Given I click the next button
    When I should be able to see the product I want to delete
    Then I click the delete button to remove the product

  Scenario: Verifying deletion in the auction page
    Given I exit the admin dashboard
    When I navigate to the public auctions page
    Then the deleted product should not be visible